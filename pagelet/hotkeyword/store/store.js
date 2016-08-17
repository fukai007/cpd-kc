import Reflux from "reflux";
import HotKeywordAction from "../action/action.js";

/*
  @purpose  增加热度排行
  @author miles_fk
  @createTime 2016-07-11 11:51
*/
var HKWStore = Reflux.createStore({

    init: function(){
      this.listenTo(HotKeywordAction.hkwTopCmp, this.hkwTopCmp);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },


    hkwTopCmp: function(res){
      this.trigger(res);
    }
});

export default HKWStore;