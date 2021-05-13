local Images = {
    onMenu = {
        images = {},
        names = {},
        Add = function(self, link, name)
            local data = http.Get(link)
            if data == nil then return end
            local a,b,c = common.DecodePNG(data)
            if a == nil or b == nil or c == nil then return end
            table.insert(self.names, name)
            table.insert(self.images, {name = name, width = b, height = c, texture = draw.CreateTexture(a,b,c)})
        end
    },
    background = {
        images = {},
        names = {},
        Add = function(self, link, name)
            local data = http.Get(link)
            if data == nil then return end
            local a,b,c = common.DecodePNG(data)
            if a == nil or b == nil or c == nil then return end
            table.insert(self.names, name)
            table.insert(self.images, {name = name, width = b, height = c, texture = draw.CreateTexture(a,b,c)})
        end
    }
}
Images.onMenu:Add("https://i.ibb.co/VM0Gj36/IMGBIN-asuka-langley-soryu-kaworu-nagisa-evangelion-chronicle-rebuild-of-evangelion-png-v-BD0m-Bb5.png", "Asuka")
Images.onMenu:Add("https://i.ibb.co/Q8Nk4xm/5e81cd15b4c94.png", "Rem")

Images.background:Add("https://i.ibb.co/K6nyrp8/pngguru-com-1.png", "Neko1")
Images.background:Add("https://i.ibb.co/wWXDk0d/pngguru-com-2.png", "Neko2")
Images.background:Add("https://i.ibb.co/CvYZZkF/evaimg1.png", "Asuka&Rei")
Images.background:Add("https://i.ibb.co/W5FPqqM/hiclipart-com-1.png", "Utako Kasumi")
Images.background:Add("https://i.ibb.co/HgY2mw0/Mirai-Kuriyama.png", "Mirai Kuriyama")
Images.background:Add("https://i.ibb.co/zG1sFk9/5e81c653042d7.png", "Gun Girl")
Images.background:Add("https://i.ibb.co/1TX80n0/5e81d78ee27f4.png", "Asuna")
Images.background:Add("https://i.ibb.co/KrSg1Yq/5e8389815d2b9.png", "Nami")
Images.background:Add("https://i.ibb.co/bggnMQG/5e8391005246e.png", "Rias")
Images.background:Add("https://i.ibb.co/2cVr8wB/5e8391dddd943.png", "Koneko")

local w, h = draw.GetScreenSize()

local menu          = gui.Reference()
local weebmenu      = gui.Tab(gui.Reference("Settings"), "WeebWare Settings", "WeebWare Settings")
local onMenuBox     = gui.Groupbox(weebmenu, "Image on menu", 16, 16, 290, 500)
local backgroundBox = gui.Groupbox(weebmenu, "Background image", 322, 16, 290, 500)
local Menu = {
    onMenu = {
        image = gui.Combobox(onMenuBox, "OMIMAGE.SET", "Select on menu image", "Off", unpack(Images.onMenu.names)),
        posX  = gui.Slider(onMenuBox, "OMIMAGE.POSITIONX.SET", "On menu image position", 0, -w - 200, w + 200),
        posY  = gui.Slider(onMenuBox, "OMIMAGE.POSITIONY.SET", "On menu image position", 0, -h, h),
        size  = gui.Slider(onMenuBox, "OMIMAGE.SIZE.SET", "On menu image size", 50, 1 , 100),
        name  = gui.Editbox(onMenuBox, "BGIMAGE.CUSTOM.URL", "Custom Image Name"),
        url   = gui.Editbox(onMenuBox, "BGIMAGE.CUSTOM.URL", "Custom Image URL"),
    },
    background = {
        image  = gui.Combobox(backgroundBox, "BGIMAGE.SET", "Select the background image", "Off", unpack(Images.background.names)),
        posX   = gui.Slider(backgroundBox, "BGIMAGE.POSITION.SET", "Background image position", w - 600, 0, w + 200),
        posY   = gui.Slider(backgroundBox, "BGIMAGE.POSITION.SET", "Background image position", h - 500, 0, h),
        size   = gui.Slider(backgroundBox, "BGIMAGE.SIZE.SET", "Background image size", 50, 1 , 100),
        always = gui.Checkbox(backgroundBox,"BGIMAGE.SHOW.ALWAYS", "Always show the background image", false),
        name   = gui.Editbox(backgroundBox, "BGIMAGE.CUSTOM.URL", "Custom Image Name"),
        url    = gui.Editbox(backgroundBox, "BGIMAGE.CUSTOM.URL", "Custom Image URL"),
    }
}
gui.Button(onMenuBox, "Add", function()
    Images.onMenu:Add(Menu.onMenu.url:GetValue(), Menu.onMenu.name:GetValue())
    Menu.onMenu.image:SetOptions("Off", unpack(Images.onMenu.names))
end)
gui.Button(backgroundBox, "Add", function()
    Images.background:Add(Menu.background.url:GetValue(), Menu.background.name:GetValue())
    Menu.background.image:SetOptions("Off", unpack(Images.background.names))
end)

local function OnMenu()
    if not menu:IsActive() then return end

    local menuX, menuY = menu:GetValue()
    local img = Images.onMenu.images[Menu.onMenu.image:GetValue()]
    local x, y = menuX + Menu.onMenu.posX:GetValue(), menuY + Menu.onMenu.posY:GetValue()
    local size = Menu.onMenu.size:GetValue()/100

    if img == nil then return end

    draw.Color(255, 255, 255, 255)
    draw.SetTexture(img.texture)
    draw.FilledRect(x, y, x+(img.width * size), y+(img.height * size))
end

local function Background()
    if not (menu:IsActive() or Menu.background.always:GetValue()) then return end

    local menuX, menuY = menu:GetValue()
    local img = Images.background.images[Menu.background.image:GetValue()]
    local x, y = Menu.background.posX:GetValue(), Menu.background.posY:GetValue()
    local size = Menu.background.size:GetValue()/100

    if img == nil then return end

    draw.Color(255, 255, 255, 255)
    draw.SetTexture(img.texture)
    draw.FilledRect(x, y, x+(img.width * size), y+(img.height * size))
end

callbacks.Register("Draw", function()
    OnMenu()
    Background()
end)
