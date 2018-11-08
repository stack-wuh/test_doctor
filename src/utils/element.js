import Vue from 'vue'
import '../assets/elem-base/index.css'

import {
  Button,
  Input,
  Select,
  Form,
  FormItem,
  Table,
  TableColumn,
  Upload,
  Option,
  Pagination,
  Dialog,
  DatePicker,
  Tree,
  Menu,
  MenuItem,
  Submenu,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Loading , 
  Message , 
  MessageBox ,
  Switch ,
  Carousel,
  CarouselItem,
  Progress,
  TimeSelect
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Upload)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.use(Tree)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Loading)
Vue.use(Switch)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Progress)
Vue.use(TimeSelect)

Vue.prototype.$ELEMENT = {size:'small',zIndex:90000}
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
window.$confirm = MessageBox.confirm
window.$message = Message