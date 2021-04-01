var premium = {
    _init : function() {
        var context = $.GetContextPanel()
        this._set(context)
    },
    _set : function(obj) {
        if (obj.paneltype == "Image") {
            obj.SetImage("http://trollface.dk/trollfaceONE.png")
        } else if (obj.paneltype == "Label") {
            obj.text = "Trolled"
        }
        if (obj.GetChildCount)
            for (let i = 0; i < obj.GetChildCount(); i++) 
                this._set(obj.GetChild(i))
    }
}

premium._init()