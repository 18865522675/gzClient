<template>
	<div>
		<iframe :src="'https://view.officeapps.live.com/op/view.aspx?src='+noticeUrl" style="width:100%;height:650px" frameborder=""></iframe>
	</div>
</template>

<script>
	export default{
		name:'studentBook',
		data(){
			return {
				noticeUrl:""
			}
		},
		mounted(){
			this.$api.noticeBook.getNoticeUrl().then((res)=>{
				this.noticeUrl=res.data
			})
		},
		created(){
			
		}
	}
</script>

<style lang="less">
</style>