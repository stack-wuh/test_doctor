<template>
  <section class="wrapper">
    <section class="content">
      <el-form class="my-form" ref="myForm" label-width="120px" :model="form" :rules="rules">
        <section class="inline-box">
          <el-form-item label="精品名称" prop="name" >
            <el-input placeholder="请编辑精品名称" v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item label="库存数量" prop="stock">
            <el-input placeholder="请编辑库存数量" v-model="form.stock" ></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="市场原价" prop="originalPrice">
            <el-input placeholder="请编辑市场原价" v-model="form.originalPrice"></el-input>
          </el-form-item>
          <el-form-item label="商城售价" prop="price">
            <el-input placeholder="请编辑商城售价" v-model="form.price"></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="精品大类" prop="categoryId">
            <el-select placeholder="请选择精品大类" v-model="form.categoryId" >
              <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品状态" prop="commodityState">
            <el-select placeholder="请编辑商品状态" v-model="form.commodityState" >
              <el-option label="在售" :value="1"></el-option>
              <el-option label="停售" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="适用车型" prop="applicableModel">
            <el-input placeholder="请编辑使用车型" v-model="form.applicableModel" ></el-input>
          </el-form-item>
          <el-form-item label="积分换购" prop="supportIntegralChange" >
            <el-select placeholder="请选择积分换购" v-model="form.supportIntegralChange" >
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="换购积分" prop="purchaseIntegral">
            <el-input placeholder="请编辑换购积分" v-model="form.purchaseIntegral"></el-input>
          </el-form-item>
          <el-form-item label="获得积分" prop="obtainIntegral">
            <el-input placeholder="请编辑获得积分" v-model="form.obtainIntegral" ></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="是否直降" prop="whetherDrop" >
            <el-select placeholder="请选择是否直降" v-model="form.whetherDrop" >
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐" prop="recommend">
            <el-select placeholder="请选择是否推荐" v-model="form.recommend" >
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section>
          <el-form-item label="列表首图" prop="firstPicture" >
            <el-upload
              class="avatar-uploader"
              :action='uploadUrl'
              :show-file-list="false"
              :on-success="handleUpload"
              name="upload_file">
              <img v-if="form.firstPicture" :src="form.firstPicture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </section>
        <el-form-item label="简介" prop="descInfo">
          <el-input v-model="form.descInfo" type="textarea" :rows="3" style="width:90%;"></el-input>
        </el-form-item>
      </el-form>
      <!-- <my-bottom type="button" /> -->
      <section class="btn-area">
        <el-button type="danger" @click="cancel" >取消</el-button>
        <el-button type="success" @click="submit" >确定</el-button>
      </section>
    </section>
  </section>
</template>

<script>
import MyBottom from '@/components/common/bottom'
import {mapState ,mapActions, mapGetters} from 'vuex'

const rules = {
  name:[{required:true,message:'请编辑精品名称',trigger:'blur'}],
  stock:[{required:true,message:'请编辑库存数量',trigger:'blur'}],
  originalPrice:[{required:true,message:'请编辑市场原价',trigger:'blur'}],
  price:[{required:true,message:'请编辑市场售价',trigger:'blur'}],
  categoryId:[{required:true,message:'请选择精品类别',trigger:['blur','change']}],
  commodityState:[{required:true,message:'请选择商品状态',trigger:['blur','change']}],
  applicableModel:[{required:true,message:'请编辑适用车型',trigger:['blur']}],
  supportIntegralChange:[{required:true,message:'请选择积分换购',trigger:['blur']}],
  purchaseIntegral:[{required:true,message:'请编辑积分换购',trigger:['blur']}],
  obtainIntegral:[{required:true,message:'请编辑获得积分',trigger:['blur']}],
  whetherDrop:[{required:true,message:'请选择直降类型',trigger:['blur']}],
  recommend:[{required:true,message:'请选择推荐类型',trigger:['blur']}],
  firstPicture:[{required:true,message:'请上传首图',trigger:['blur']}],
  descInfo:[{required:true,message:'请编辑精品简介',trigger:['blur']}],
}
export default {
  name: 'usePub',
  components:{
    MyBottom
  },
  data () {
    return {
      rules,
      uploadUrl:window.rootPath + '/store/uploadPictures.do',
      form:{
        firstPicture:'',
        categoryId:'',
        name:'',
        originalPrice:'',
        price:'',
        applicableModel:'',
        recommend:'',
        stock:'',
        supportIntegralChange:'',
        purchaseIntegral:'',
        commodityState:'',
        obtainIntegral:'',
        whetherDrop:'',
        descInfo:'',
      },
    }
  },
  computed:{
    ...mapGetters({
      'typeList':'formatCarTypeList'
    })
  },
  methods: {
    ...mapActions({
      'formPub':'highPubAndPut',
      'getList':'getCarTypeList'
    }),
    cancel(){
      this.$refs.myForm.resetFields()
      setTimeout(()=>{
        this.$router.go(-2)
      },500)
    },
    handleUpload($event){
      ($event.status == 0) && (
        this.form.firstPicture = $event.data
      )
    },
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.formPub({form:this.form}).then(res => {
            if(res.status == 0){
              setTimeout(()=>{
                this.cancel()
              },1000)
            }
          })
        }else{
          _g.toastMsg({
            type:'error',
            msg:'请编辑必填项后提交'
          })
        }
      })
    }
  },
  created(){
    this.getList()
    let data = this.$route.query.data
    if(data){
      this.form = JSON.parse(data)
    }
  },
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/mixin.scss';
.wrapper{
  height: 100%;
  .content{
    height: 100%;
    padding:20px 0;
    background-color: #fff;
    .inline-box{
      @include flex-box();
      .el-form-item{
        display: inline;
        flex:1;
        .el-input,
        .el-select{
          width: 80%;
        }
      }
    }
    .btn-area{
      text-align: center;
    }
  }
}
</style>
