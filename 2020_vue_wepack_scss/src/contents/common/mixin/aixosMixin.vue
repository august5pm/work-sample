<script>
    export default {
        data() {
            return {
               
            }
        },
        methods: {
            requestGetJson : function(url, data){
                this.$axios.get(url,{
                    params:data
                })
                .then(res => {
                    console.log(res);  
                })
                .catch(error => {
                    console.log(error);  
                })
            },
            requestPostJson : function(url, data){
                this.$axios.post(url, data)
                .then(res => {
                    console.log(res);  
                })
                .catch(error => {
                    console.log(error);  
                })
            }
        }
    }
</script>

