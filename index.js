new Vue({
  el: '#app',
  data () {
    return {
      keywords:'',
      industry:'全て',
      status:'全て',
      allinfo: null,
      alles:null,
      alldate:null,
      isActive:false,
    }
  },
  methods: {
    clear: function () {
      this.keywords = ''
      this.industry = '全て'
      this.interactive = '全て'
      this.option = '全て'
      this.format = '全て'
    }
  },
  mounted () {

    fetch(
      'https://script.google.com/macros/s/AKfycbx8aLf_-zYHUSnH0D9GTe9T6tZ8xZWYWaOCsMKGr_pgdUZERg/exec',
    )
    .then(res => res.json())
    .then(
      result => {
        this.allinfo = result
      },
      error => {

      },
    );

    fetch(
      'https://script.google.com/macros/s/AKfycby5Lt79N1u3u5OBC_FBOYXtfy1JbEhmhxcya8XPB4BMHE1I_w/exec',
    )
    .then(res => res.json())
    .then(
      result => {
        this.alles = result
      },
      error => {

      },
    );
    fetch(
      'https://script.google.com/macros/s/AKfycbyeamRglJBDCSojo1KmDWLmptpjLl_jDQruvRYo77Ns2-0SMA/exec',
    )
    .then(res => res.json())
    .then(
      result => {
        this.alldate = result
      },
      error => {

      },
    );

  },
  computed: {
    filtered: function() {

      var allinfo = [];
      var alldate = [];

      for(var i in this.allinfo) {

        var info = this.allinfo[i];

        // if (this.keywords !== '') {
        //   if(projectName.project_name.indexOf(this.keywords) !== -1　||　projectName.client_name.indexOf(this.keywords) !== -1) {
        //     allinfo.pop(projectName);
        //   }
        // }

        var flag = false
        var datelist = [];
        var dateobject = {};

        for (var n in this.alldate) {
          var date = this.alldate[n];
          if (date.name == info.name) {
            dateobject.plan = date.plan;
            dateobject.date = date.date;
            datelist.push(dateobject)
            info.date = datelist
          }
        }

        var eslist = [];

        for (var n in this.alles) {
          var es = this.alles[n];
          if (es.name == info.name) {
            var esobject = {};
            esobject.question = es.question;
            esobject.answer = es.answer;
            esobject.category = es.category;
            eslist.push(esobject)
          }
        }

        info.es = eslist
        info.esnum = eslist.length




        allinfo.push(info);

        //業種絞り込み
        if (this.industry === '全て' ) {

        } else if (info.industry !== this.industry) {
          allinfo.pop();
          flag = true
        }

        //選考状況
        if (this.status === '全て' ) {

        } else if (info.status !== this.status && flag !== true) {
          allinfo.pop();
          flag = true
        }

      }
      return allinfo;
    }



  }
})
