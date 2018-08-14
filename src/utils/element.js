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

Vue.prototype.$ELEMENT = {size:'small',zIndex:90000}
