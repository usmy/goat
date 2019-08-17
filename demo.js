new Vue({
  el: '#app',
  data () {
    return {
      keywords:'',
      industry:'全て',
      status:'全て',
      company: null,
    }
  },
  methods: {
    clear: function () {
      this.keywords = ''
      this.industry = '全て'
      this.interactive = '全て'
      this.option = '全て'
      this.format = '全て'
    },
    console.log(this.company)
  },
  mounted: function () {
    axios.get("data.json").then(response => (this.company = response))
  },
  computed: {
    filtered: function() {

      var company = [];

      for(var i in this.company) {

        var info = this.company[i];

        // if (this.keywords !== '') {
        //   if(projectName.project_name.indexOf(this.keywords) !== -1　||　projectName.client_name.indexOf(this.keywords) !== -1) {
        //     company.pop(projectName);
        //   }
        // }

        var flag = false

        company.push(info);

        //業種絞り込み
        if (this.industry === '全て' ) {

        } else if (info.industry !== this.industry) {
          company.pop();
          flag = true
        }

        //選考状況
        if (this.status === '全て' ) {

        } else if (info.status !== this.status && flag !== true) {
          company.pop();
          flag = true
        }

      }
      return company;
    }
  }
})
