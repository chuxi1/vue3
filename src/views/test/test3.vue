<template>
    <div class="home_div">
        <div id="search">
            <el-input v-model="searchValue" @keyup.enter="seachAddress" id="tipinput" placeholder="请输入要搜索的位置"
                style="width: 200px; margin: -1px 2px 0 12px" />
            <el-button type="primary" @click="seachAddress">查询</el-button>
        </div>
        <div id="container" style="height: 80vh; width: 100%"></div>
        <div id="rectangleControl">
            <el-button type="success" @click="addRectangle">添加矩形</el-button>
        </div>
    </div>
</template>
<script setup>
// 地图map
import AMapLoader from "@amap/amap-jsapi-loader"
import { reactive, ref, onMounted, nextTick, defineProps } from 'vue';
import { shallowRef } from '@vue/reactivity'

/**实际生产中不要用 此处仅测试 
   具体实际使用方法看官网*/
window._AMapSecurityConfig = {
    securityJsCode: '45cea57f74a4b29d21c1481382db4c45', // 应用生成的秘钥
}
const rectangle = ref(null);

const addRectangle = () => {
    // Specify the coordinates for the rectangle (replace with your desired values)
    const bounds = new AMap.Bounds([119.22, 25.99], [119.25, 26.03]);

    // Remove existing rectangle if any
    if (rectangle.value) {
        rectangle.value.setMap(null);
    }

    // Create a new rectangle
    rectangle.value = new AMap.Rectangle({
        bounds: bounds,
        strokeColor: "#FF33FF",
        strokeWeight: 10,
        strokeOpacity: 0.8,
        fillOpacity: 0.6,
        fillColor: "#1791fc",
        zIndex: 50,
        cursor: 'pointer',
    });

    // Add the rectangle to the map
    state.map.add(rectangle.value);
};

const searchValue = ref('医工科技大楼')
const lnglat = ref('')
const state = reactive({
    map: null,
    placeSearch: null,
    autoComplete: null,
    marker: null,
    form: {
        address: '',
        lng: '',
        lat: '',
    },
})


// 地图初始化
function initMap(arr) {  // 参数为中心点经纬度坐标 
    AMapLoader.load({
        key: "b65f2252f81516a912b92ba12fc59ce8",
        version: "2.0",
        plugins: ["AMap.ToolBar", "AMap.ControlBar", 'AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Geocoder', 'AMap.Marker'],
    }).then((AMap) => {
        state.map = new AMap.Map('container', {
            viewMode: "3D",  //  是否为3D地图模式
            zoom: 10, //  地图显示的缩放级别
            zooms: [3, 33], // 地图缩放范围
            center: arr, //  地图中心点坐标
            resizeEnable: true  //  是否监控地图容器尺寸变化
        });
        // 地图放大缩小插件
        let toolBar = new AMap.ToolBar({
            position: {
                top: '120px',
                right: '51px'
            }
        })
        // 3D地图插件
        let controlBar = new AMap.ControlBar({
            position: {
                top: '20px',
                right: '20px',
            },
        });

        state.geoCoder = new AMap.Geocoder({
            city: '全国', // 默认：“全国”
            radius: 1000 // 范围，默认：500
        })

        state.autoComplete = new AMap.AutoComplete({ city: '全国' });

        state.placeSearch = new AMap.PlaceSearch({
            map: state.map
        })
        state.map.on('click', clickMap)
        state.map.addControl(toolBar);   // 添加右上角的放大缩小
        state.map.addControl(controlBar);   // 添加右上角的放大缩小
    }).catch((e) => {
        console.error(e);  //加载错误提示
    }).finally(() => {
        initCoord([state.form.lng, state.form.lat])
    })
}

// 地图点击事件
function clickMap(e) { // 点击地图事件
    if (!e && !e.lnglat) {
        return
    }
    state.form.lng = e.lnglat.lng
    state.form.lat = e.lnglat.lat
    regeocoder()
    removeMarker() // 先删除地图上标记点
    setMapMarker() // 在添加新的标记点
}

// 关键字搜索
const seachAddress = () => {
    console.log(searchValue.value)
    if (searchValue.value != '') {
        //清除地图上的覆盖物
        state.map.clearMap()
        state.map.plugin('AMap.PlaceSearch', () => {
            let placeSearch = new AMap.PlaceSearch({
                // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
                city: '010',
                map: state.map
            })
            let that = state.form
            placeSearch.search(searchValue.value, function (status, result) {
                // 查询成功时，result即对应匹配的POI信息 
                var pois = result.poiList.pois
                for (var i = 0; i < pois.length; i++) {
                    var poi = pois[i]
                    var marker = []
                    marker[i] = new AMap.Marker({
                        position: poi.location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: poi.name
                    })
                    // 将创建的点标记添加到已有的地图实例：
                    state.map.add(marker[i])
                }
                state.map.setFitView()
                AMap.Event.addListener(placeSearch, 'markerClick', function (data) {
                    let result = data
                    //经纬度
                    state.form.lng = result.event.lnglat.lng
                    state.form.lat = result.event.lnglat.lat
                    toGetAddress()
                })
            })
        })
    } else {
        alert('请输入地址')
    }
}


// 筛选查询
function searchCoord(data) {
    if (data) {
        //清除地图上的覆盖物
        state.map.clearMap()
        state.map.setCenter([data.records[0].longitude, data.records[0].latitude])
        state.map.setZoom(11)
        var marker = []
        for (var index = 0; index < data.records.length; index++) {
            var poi = data.records[index]
            // 其他坐标转J02坐标
            var gps = [poi.longitude, poi.latitude]
            AMap.convertFrom(gps, 'gps', function (status, result) {
                if (result.info === 'ok') {
                    poi.longitude = result.locations[0].lng
                    poi.latitude = result.locations[0].lat
                }
            });
            marker[index] = new AMap.Marker({
                position: [poi.longitude, poi.latitude],
                title: poi.locationName
            })
            // 将创建的点标记添加到已有的地图实例：
            state.map.add(marker[index])
            var content = []
            if (poi.personInCharge) {
                content.push("负责人: " + poi.personInCharge + "")
            }
            marker[index].content = content
            marker[index].title = poi.locationName
            marker[index].on('click', showInfoWindow)
            state.map.off('click', clickMap)
        }
    }
}

// 自定义窗体
function showInfoWindow(e) {
    //实例化信息窗体
    var title = e.target.title,
        content = e.target.content;
    var infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content.join("<br/>")),
        closeWhenClickMap: true,
        offset: new AMap.Pixel(16, -45)
    });
    infoWindow.open(state.map, e.target.getPosition());
}

//构建自定义信息窗体
function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";

    //可以通过下面的方式修改自定义窗体的宽高
    info.style.width = "800px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    top.className = "info-top";
    titleD.innerHTML = title;
    top.appendChild(titleD);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    // var sharp = document.createElement("img");
    // sharp.src = "https://webapi.amap.com/images/sharp.png";
    // bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
}


// 下拉选中查询 
function select(e) {
    state.placeSearch.setCity(e.poi.adcode)
    state.placeSearch.search(e.poi.name) //关键字查询查询
}

// 坐标转换
function initCoord(gps) {
    // 其他坐标转J02坐标
    AMap.convertFrom(gps, 'gps', function (status, result) {
        if (result.info === 'ok') {
            state.form.lng = result.locations[0].lng
            state.form.lat = result.locations[0].lat
            nextTick(function () {
                removeMarker()
                setMapMarker()
            })
        }
    });
}

// 设置标记
function setMapMarker() {
    if (state.form.lng == '' && state.form.lat == '') {
        return
    }
    state.map.setFitView()
    state.marker = new AMap.Marker({
        map: state.map,
        position: [state.form.lng, state.form.lat],
    })
    toGetAddress()
    state.map.add(state.marker)
    state.map.setFitView()
}

// 清除标记
function removeMarker() {
    if (state.marker) {
        state.map.remove(state.marker)
    }
}

// 坐标位置转换
function regeocoder() {
    let lnglat = [state.form.lng, state.form.lat]
    state.geoCoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.regeocode) {
            state.form.address = result.regeocode.formattedAddress // 返回位置信息
        }
    })
}

// 获取地址
function toGetAddress() {
    let lnglat = [state.form.lng, state.form.lat]
    state.geoCoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.regeocode) {
            // 此处写处理逻辑
        }
    })
}

function toGetCoordinate() {
    let address = state.form.address
    state.geocoder.getLocation(address, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            initMap([result.geocodes[0].location.lng, result.geocodes[0].location.lat])
            state.form.lng = result.geocodes[0].location.lng
            state.form.lat = result.geocodes[0].location.lat
            state.form.address = result.geocodes[0].formattedAddress
        }
    })
    nextTick(function () {
        removeMarker()
        setMapMarker()
    })
}

onMounted(() => {
    //组件挂载
    initMap([119.2324656, 26.0190494])
});





</script>
<style lang="less" scoped>
.home_div {
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0px;
    position: relative;
}

#container {
    padding: 0px;
    margin: 0px;
}

html,
body,
#container {
    height: 100%;
    width: 100%;
}

.content-window-card {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
    padding: 0;
}

.content-window-card p {
    height: 2rem;
}

.custom-info {
    border: solid 1px silver;
}

div.info-top {
    position: relative;
    background: none repeat scroll 0 0 #F9F9F9;
    border-bottom: 1px solid #CCC;
    border-radius: 5px 5px 0 0;
}

div.info-top div {
    display: inline-block;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    line-height: 31px;
    padding: 0 10px;
}

div.info-top img {
    position: absolute;
    top: 10px;
    right: 10px;
    transition-duration: 0.25s;
}

div.info-top img:hover {
    box-shadow: 0px 0px 5px #000;
}

div.info-middle {
    font-size: 12px;
    padding: 10px 6px;
    line-height: 20px;
}

div.info-bottom {
    height: 0px;
    width: 100%;
    clear: both;
    text-align: center;
}

div.info-bottom img {
    position: relative;
    z-index: 104;
}

span {
    margin-left: 5px;
    font-size: 11px;
}

.info-middle img {
    float: left;
    margin-right: 6px;
}
</style>