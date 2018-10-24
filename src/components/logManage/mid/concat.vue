<template>
  <section class="wrapper">
    <section class="form-area">
      <el-form>
        <section class="inline-block">
          <el-form-item v-for="(item,index) in list" :key="index" :label="item.label" class="form-item" >
            <el-input placeholder="占位符" v-model="form[item.prop]" class="my-input-220"></el-input>
            <el-input v-if="item.sub" placeholder="占位符" v-model="form[item.prop_sub]" class="my-input-220 margin-tp-15"></el-input>
          </el-form-item> 
        </section>
      </el-form>
      <section v-for="(item,index) in imgs" :key="index" class="img-list">
        <section class="list-nav">
          <h5>{{item.label}}</h5>
          <small>{{item.sub}}</small>
        </section>
        <section v-for="(list,ldx) in item.list" :key="ldx" class="list">
            <el-upload
              ref="upload"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              name='upload_file'
              :on-success="(res,file) => {return handleAvatarSuccess(res,file,index,ldx)}"
              :before-upload="beforeAvatarUpload"
              >
              <img v-if="list.url" :src="list.url" class="avatar" alt="logo">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          <p class="img-desc">{{list.label}}</p>
        </section>
      </section>
      <section class="btn-area">
        <el-button type="primary"  @click="submit">发布</el-button>
      </section>
    </section>
  </section>
</template>

<script>
import MySubButton from '@/components/common/subButton'
import {mapActions} from 'vuex'
export default {
  name: 'concat',
  components:{
    MySubButton
  },
  data () {
    return {
      list:[
        {
          label:'公司名称:',
          value:'武汉把图科技有限公司',
          prop:'name',
        },
        {
          label:'预约热线(服务时间: 工作日全天候):',
          value:'手机号码: 1882739293',
          prop:'bookingHotline',
        },
        {
          label:'电话及传真:',
          value:'电话: 027-12311332',
          sub:'传真: 027-12311332',
          prop:'phone',
          prop_sub:'fax'
        },
        {
          label:'公司地址及邮箱:',
          value:'地址: 武汉市汉阳路18号',
          sub:'邮箱: 12312312@qq.com',
          prop:'address',
          prop_sub:'email'
        }
      ],
      imgs:[
        {
          label:'店面形象',
          sub:'750*750(px)',
          list:[
            {
              label:'前台',
              url:''
            },
            {
              label:'接待室',
              url:'',
            },
            {
              label:'检修室',
              url:'',
            }
          ]
        },
        {
          label:'团队展示',
          sub:'750*750(px)',
          list:[
            {
              label:'团队展示1',
              url:'',
            },
            {
              label:'团队展示2',
              url:'',
            },
            {
              label:'团队展示3',
              url:'',
            }
          ]
        },
        {
          label:'门店资质',
          sub:'750*750(px)',
          list:[
            {
              label:'资质认定书',
              url:'',
            },
            {
              label:'营业执照',
              url:'',
            },
            {
              label:'资质证书',
              url:'',
            }
          ]
        },
      ],
      form:{
        name:'',
        address:'',
        email:'',
        phone:'',
        fax:'',
        bookingHotline:'',
        reserved1:[],
        reserved2:[],
        reserved3:[],
      },
      uploadUrl:rootPath + '/store/uploadPictures.do'
    }
  },

  methods: {
    ...mapActions({
      'getLogConcat': 'getLogStore',
      'logConcat': 'logConcat'
    }),
    handleAvatarSuccess(res,file, index, ldx){
      this.imgs[index].list[ldx].url = res && res.data
    },
    beforeAvatarUpload(){},
    submit(){
      let _arr = this.imgs.map(item => {
        return item.list.map(list => {
          return list.url
        })
      })
      this.form = {...this.form, reserved1: _arr[0].toString(), reserved2: _arr[1].toString(), reserved3: _arr[2].toString()}
      this.logConcat({form: this.form, path: '联系我们'})
    }
  },
  created(){
    this.getLogConcat({path: '联系我们'}).then(res => {
      this.form = {...this.form, ...res.data}
      let temp_1 = res.data.reserved1 && res.data.reserved1.split(','),
          temp_2 = res.data.reserved2 && res.data.reserved2.split(','),
          temp_3 = res.data.reserved3 && res.data.reserved3.split(','),
          _temp = [temp_1, temp_2, temp_3]
      this.imgs.map((item,index) => {
        item.list.map((sub,sid) => {
          sub.url = _temp[index][sid]
        })
      })
    })
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/color.scss';
@import '../../../assets/style/mixin.scss';
.wrapper{
  padding: 20px;
  background-color: #fff;
  .inline-block{
    .form-item{
      @include flex-box();
    }
  }
  .img-list{
    @include flex-box(row, nowrap, space-between, center);
    margin-bottom:15px;
    .list-nav{
      @include flex-box(column, wrap, flex-start);
      width: 140px;
      small{
        color: #ccc;
      }
    }
    .list{
      flex:1;
      @include flex-box(column, wrap, center, center);
      img[alt="logo"]{
        width: 120px;
        height: 120px;
      }
      .img-desc{
        margin-top:4px;
        padding:2px 10px;
        border:1px solid #333;
      }
    }
  }
  .btn-area{
    margin-top:40px;
    text-align:center;
    .el-button{
      width: 120px;
    }
  }
}
</style>
