import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'
const state = {
  data:[],
  total:0,
  currentPage:1,
}

const actions = {
  /**
   * 获取用品管理模块表格数据
   */
  getUseStore({commit ,rootState, dispatch} , {path ,search, currPageNo = 1 } = {}){
    let _url = ''
    switch(path){
      case '汽车精品管理' : _url = 'quality/getQualityList.do' , search = {...rootState.search ,search, currPageNo}, dispatch('getCarTypeList')
        break; 
      case '精品订单管理' : _url = 'quality/getOrderList.do' , search = {...rootState.search ,search, currPageNo}
        break;
      case '配件大类管理' : _url = 'quality/getPartsList.do' , search = {...rootState.search ,search, currPageNo}
        break;
    }
    $http.post(_url , NotNull(search),res => {
      commit('setUseStore' ,{data:res.data})
    })
  },

  /**
   * 用品管理 -- 汽车精品管理
   * 编辑 / 新增 汽车精品信息
   */
   highPubAndPut({dispatch} , {form, form:{
     id,
     firstPicture,
     categoryId,
     name,
     originalPrice,
     price,
     applicableModel,
     recommend,
     stock,
     supportIntegralChange,
     purchaseIntegral,
     commodityState,
     obtainIntegral,
     whetherDrop,
     descInfo,
   }} = {} ){
     let _url = id ? 'quality/updateQuality.do' : 'quality/addQuality.do'
    return new Promise((resolve,reject)=>{
      $http.post(_url, {
        id,
        firstPicture,
        categoryId,
        name,
        originalPrice,
        price,
        applicableModel,
        recommend,
        stock,
        supportIntegralChange,
        purchaseIntegral,
        commodityState,
        obtainIntegral,
        whetherDrop,
        descInfo,
      }, res => {
        return resolve(true)
       })
    })
   },
   /**
    * 用品管理 -- 精品订单管理
    * 提货
    */
   handleTakeGood({dispatch} ,{row:{id} ,path } = {}){
    $http.post('quality/takeGoods.do' ,{id} ,res=>{
      dispatch('getUseStore' , {path})
    })
   },
   /**
    * 用品管理 -- 配件大类管理
    * 新增/编辑
    */
   partsPubAndPut({dispatch} ,{path ,form ,form:{id}} = {}){
     let _url = id ? 'quality/updateParts.do' : 'quality/addParts.do'
     $http.post(_url ,form ,res => {
       setTimeout(()=>{
         dispatch('asyncHideDialog')
         dispatch('getUseStore' ,{path})
       },1000)
     })
   },

   /**
    * 该方法作为use模块内部
    * 所有表格删除事件的公共方法
    */
   useDelAndFresh({dispatch} ,{path ,row:{id}} = {}){
      $http.post('quality/delParts.do' ,{ids:id} ,res => {
        setTimeout(()=>{
          dispatch('getUseStore' ,{path})
        },1000)
      })
   }
}

const mutations = {
  /**
   * 存储data值
   */
  setUseStore(state ,{data} = {}){
    state.data = data && data.list
    state.total = data && data.total
    state.currentPage = data && data.pageNum
  }
}

const getters = {
  /**
   * 计算初始data
   */
  useData(state){
    return state.data
  },
  /**
   * 过滤data之后输出
   */
  formatUseData:(state,getters) => ({path} = {}) =>{
    return  (getters.useData) && (Array.isArray(getters.useData)) && getters.useData.map(item => {
        switch(path){
          case '汽车精品管理' : return {...item ,pushText:item.recommend == 0 ? '否' : '是' ,changeText:item.supportIntegralChange == 0 ? '否' : '是' ,saleText:item.commodityState == 1? '在售': '停售' ,dropText:item.whetherDrop == 1? '是': '否' } ;
          case '精品订单管理' : return {...item , stateText:item.state == 0 ? '未支付' : item.state == 1 ? '待提货' :'已提货'} ;
          case '配件大类管理' : return {...item}
        }
    })
  },
}

export default {
  state , actions , mutations , getters
}