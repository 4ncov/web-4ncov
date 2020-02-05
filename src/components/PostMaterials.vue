<style scoped>
.post-materials {
}
.el-button {
  padding: 0.1rem 0.2rem;
}
.el-button > span {
  font-size: 0.25rem;
}
.add-materials,
.remove-materials {
  float: right;
}

.el-form-item {
  margin-bottom: 0.2rem;
}

.submit {
  display: block;
  margin: 0.2rem auto;
  width: 7rem;
}
</style>

<template>
  <div class="post-materials">
    <h3 v-text="labels.title"></h3>
    <el-form ref="form" :model="formData" label-width="4rem">
      <label v-text="labels.materials"></label>
      <!-- 物资列表开始 -->
      <div class="materials">
        <div class="materials-item" v-for="(material, i) in formData.materials" :key="material.name">
          <label v-text="`物资${i + 1}`"></label>
          <el-form-item label="种类">
            <el-select v-model="material.category">
              <el-option v-for="category in categoryList" :key="category" :label="category" :value="category"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品名">
            <el-input v-model="material.name"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="material.quantity"></el-input>
          </el-form-item>
          <el-form-item label="执行标准">
            <el-input v-model="material.standard"></el-input>
          </el-form-item>
          <el-button type="primary" class="remove-materials" @click="handleRemoveMaterial(i)" v-show="formData.materials.length > 1">移除</el-button>
        </div>
        <el-button type="primary" class="add-materials" @click="handleAddMaterial">添加</el-button>
      </div>
      <!-- 物资列表结束 -->
      <!-- 用户信息开始 -->
      <label v-text="labels.contactor"></label>
      <div class="other">
        <el-form-item :label="labels.hospitalName">
          <el-input v-model="formData.hospitalName"></el-input>
        </el-form-item>
        <el-form-item :label="labels.contactorName">
          <el-input v-model="formData.contactorName"></el-input>
        </el-form-item>
        <el-form-item :label="labels.contactorPhone">
          <el-input v-model="formData.contactorPhone"></el-input>
        </el-form-item>
        <el-form-item :label="labels.address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
      </div>
      <!-- 用户信息结束 -->
      <label>其他信息</label>
      <!-- 图片上传 -->
      <el-upload class="upload" action="/api/images" :on-success="handleUploadSuccess" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip" v-text="labels.uploadTip"></div>
      </el-upload>
      <el-form-item label="备注">
        <el-input v-model="formData.comment"></el-input>
      </el-form-item>
      <el-button class="submit" type="primary" @click="handleSubmit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
const cloneDeep = v => JSON.parse(JSON.stringify(v || {}))
// 1. 确认一下接口：
// 寻求方注册 /api/hospitals/sign-up
// 寻求方发布 /api/required-materials
// 供应方注册 /api/suppliers/sign-up
// 供应方发布 /api/supplied-materials
// 图片上传   /api/images
export default {
  name: 'post-materials',
  props: {
    formData: {
      type: Object,
      default: () => ({
        // 发布/供货机构名称
        hospitalName: '',
        // 联系人
        contactorName: '',
        // 联系电话
        contactorPhone: '',
        // 收货/发货地址
        address: '',
        // 物资图片, 支持多张
        imageUrls: [],
        // 物资信息
        materials: [
          {
            // 物资类别
            category: '',
            // 物资名称
            name: '',
            // 物资数量
            quantity: '',
            // 执行标准
            standard: ''
          }
        ],
        // 备注
        comment: ''
      })
    },
    labels: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      categoryList: ['口罩', '防护眼镜', '防护服', '医用帽', '防护面罩', '核酸检测试剂']
    }
  },
  created() {
    this.materialBackup = cloneDeep(this.formData.materials)
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.formData)
    },
    handleAddMaterial() {
      this.formData.materials.push(cloneDeep(this.materialBackup))
    },
    handleRemoveMaterial(i) {
      this.formData.materials.splice(i, 1)
    },
    handleUploadSuccess(res) {
      const url = res.data.url
      this.formData.imageUrls = Array.isArray(url) ? url : []
    }
  }
}
</script>
