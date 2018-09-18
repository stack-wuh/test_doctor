<template>
  <section class="wrapper question">
      <section class="content list">
          <p class="title">编辑问卷详情</p>
          <el-form class="my-form" ref="myForm" label-width="120px">
            <el-form-item label="问卷标题">
              <el-input v-model="form.name" class="my-input-220"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目">
              <el-select v-model="form.type"> </el-select>
            </el-form-item>
            <el-form-item label="标题图片">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-checkbox label="勾选时选择为首页banner图片" ></el-checkbox>
            </el-form-item>
            <section>
              <el-form-item label="问卷开始日期">
                <el-date-picker v-model="form.start"></el-date-picker>
              </el-form-item>
              <el-form-item label="问卷结束日期">
                <el-date-picker v-model="form.end"></el-date-picker>
              </el-form-item>
            </section>
            <el-form-item label="主参对象">
              <el-select v-model="form.main" class="margin-rg-15"></el-select>
              <el-select v-model="form.main"></el-select>
            </el-form-item>
            <el-form-item label="消费推送">
              <el-checkbox-group v-model="form.send">
                <el-checkbox label="不推送"></el-checkbox>
                <el-checkbox label="爱车保养消费"></el-checkbox>
                <el-checkbox label="故障检查消费"></el-checkbox>
                <el-checkbox label="事故维修消费"></el-checkbox>
                <el-checkbox label="购买保险消费"></el-checkbox>
                <el-checkbox label="美容洗车消费"></el-checkbox>
                <el-checkbox label="其他消费"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="选择奖品">
              <el-select v-model="form.lottory"></el-select>
            </el-form-item>
          </el-form>
          <section class="list">
            <p class="title">添加问卷</p>
            <section class="content">
              <span class="nav-title">点击选择题型</span>
              <el-select v-model="type" >
                <el-option label="请选择题型" value="0" ><span class="span-item" @click="selectClick">请选择题型</span></el-option>
                <el-option label="单选" value="1" ><span class="span-item" @click="selectClick(1)">单选</span></el-option>
                <el-option label="多选" value="2" ><span class="span-item" @click="selectClick(2)">多选</span></el-option>
                <el-option label="填空" value="3" ><span class="span-item" @click="selectClick(3)">填空</span></el-option>
              </el-select>
              <section class="item-box">
                <section v-for="(item,index) in lists" :key="index" class="item">
                  <section class="btn-nav">
                    <!-- <span class="btn">编辑</span> -->
                    <span @click="handleDelItem(index)" class="btn">删除</span>
                  </section>
                  <p class="item-title">{{index+1}}.<span>{{item.title || '这里是标题哦'}}</span>【{{item.name}}】</p>
                  <section class="subarea">
                    <ul>
                      <li>
                        <span class="sub-title">请编辑问卷标题</span>
                        <el-input v-model="item.title" class="my-input-220" placeholder="请编辑问卷标题"></el-input>
                      </li>
                      <li v-if="item.type == 'radio' || item.type == 'check'" >
                        <span class="sub-title">请编辑问卷选项</span>
                        <el-input v-model="item.value" class="my-input-220 margin-rg-15" placeholder="请编辑问卷选项"></el-input>
                        <el-button @click="handleAddQuesItem(index)">添加</el-button>
                      </li>
                      <li v-for="(list,lindex) in item.list" :key="lindex">
                        <span class="margin-rg-15"><span class="c999">选项{{lindex+1}}:</span> {{list}}</span>
                        <el-button style="color:#F56C6C;" type="text" @click="handleDelItem(index,lindex)" >删除</el-button>
                      </li>
                    </ul>
                  </section>
                </section>
              </section>
            </section>
          </section>
          <my-sub-button @handleSubmit="submit" @handleCancel="cancel" />
      </section>
  </section>
</template>

<script>
import MySubButton from '@/components/common/subButton'
const radioType = {
  type:'radio',
  name:'单选题',
  title:'',
  value:'',
  list:[],
}
const checkType = {
  type:'check',
  name:'多选题',
  title:'',
  list:[],
}
const textType = {
  type:'textarea',
  name:'填空题',
  title:'',
  list:[],
}
export default {
  name: 'questionPub',
  components:{
    MySubButton ,
  },
  data () {
    return {
      imageUrl:'',
      type:'',
      form:{
        name:'',
        type:'',
        start:'',
        end:'',
        main:'',
        sub:'',
        send:'',
        lottory:'',
      },
      radioType ,
      checkType ,
      textType ,
      lists:[],
      value:'',
    }
  },

  methods: {
    handleAddQuesItem(index){
      if(!this.lists[index].value){
        _g.toastMsg({type:'error',msg:'请编辑内容后添加'})
        return
      }
      this.lists[index].list.push(this.lists[index].value)
      this.lists[index].value = ''
    },

    handleDelItem(index,lindex){
      lindex ? this.lists[index].list.splice(lindex,1)
       : this.lists.splice(index,1)
    },

    selectClick(type){
      let obj = type === 1 ? this.radioType : type == 2 ? this.checkType : this.textType
      this.lists = [...this.lists , JSON.parse(JSON.stringify(obj))]
    },
    submit(){
      console.log(this.lists)
    },
    cancel(){

    }
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/color.scss';
@import '../../../assets/style/color.scss';
.wrapper{
  height: 100%;
  .content{
    height: 100%;
    background-color: #fff;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0;
    }
    .my-form{
      padding: 15px 0;
    }
    .list{
      .title{
        height: 40px;
        padding-left: 20px;
        line-height: 40px;
        color: $search-cl;
        background-color: $search-bg;
      }
      .content{
        padding: 20px;
        span.nav-title{
          margin-right: 15px;
          color:#999;
        }
        .item-box{
          .item{
            position: relative;
            min-height:120px;
            padding: 15px;
            margin-top:10px;
            .item-title{
              margin-bottom:10px;
            }
            .btn-nav{
              display: none;
              position: absolute;
              right: 0;
              top:0;
              span.btn{
                display: inline-block;
                padding:2px 5px;
                margin:0 10px;
                background-color: $base;
                color: #fff;
                &:hover{
                  cursor: pointer;
                }
              }
            }
            &:hover{
              border:1px solid #eee;
              .btn-nav{
                display: block;
              }
            }
            .subarea{
              ul li{
                margin-bottom: 10px;
              }
              .sub-title{
                color: #999;
                margin:10px 15px 10px 0;
              }
            }
          }  
        }
      }
    }
  }
}
</style>
