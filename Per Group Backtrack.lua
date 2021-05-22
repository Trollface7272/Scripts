local cfgName = "PerWeaponBacktrack.dat"

local Menu = {Ref={},LastSelectedBox={},Slider={},GetGroup=function()end,HandleSubTab=function()end,HandleValue=function()end,Handle=function()end,HandleValueRounding=function()end}
local Config = {Exists=function()end,Create=function()end,Load=function()end,Save=function()end}
local Weapons = {ToGroup={}}

local BacktrackValues = {["Zeus"] = 0,["Pistol"] = 0,["Heavy Pistol"] = 0,["Submachine Gun"] = 0,["Rifle"] = 0,["Shotgun"] = 0,["Scout"] = 0,["Auto Sniper"] = 0,["Sniper"] = 0,["Light Machine Gun"] = 0}

Weapons.ToGroup = {["deagle"]="Heavy Pistol",["elite"]="Pistol",["fiveseven"]="Pistol",["glock"]="Pistol",["ak47"]="Rifle",["aug"]="Rifle",["awp"]="Sniper",["famas"]="Rifle",["g3sg1"]="Auto Sniper",["galilar"]="Rifle",["m249"]="Light Machine Gun",["m4a1"]="Rifle",["mac10"]="Submachine Gun",["p90"]="Submachine Gun",["mp5sd"]="Submachine Gun",["ump45"]="Submachine Gun",["xm1014"] ="Shotgun",["bizon"]="Submachine Gun",["mag7"]="Shotgun",["negev"]="Light Machine Gun",["sawedoff"]="Shotgun",["tec9"]="Pistol",["taser"]="Zeus",["hkp2000"]="Pistol",["mp7"]="Submachine Gun",["mp9"]="Submachine Gun",["nova"]="Shotgun",["p250"]="Pistol",["scar20"]="Auto Sniper",["sg556"]="Rifle",["ssg08"]="Scout",["m4a1_silencer"]="Rifle",["usp_silencer"]="Pistol",["cz75a"]="Pistol",["revolver"]="Heavy Pistol"}

Menu.Ref = gui.Reference("Legitbot", "Weapon", "Target")
Menu.LastSelectedBox = Menu:GetGroup()
Menu.LastValue = BacktrackValues[Menu.LastSelectedBox]
Menu.Slider = gui.Slider(Menu.Ref, "", "Backtrack", BacktrackValues[Menu.LastSelectedBox], 0, 400)
Menu.GetGroup = function(self)
    return Menu.Ref:GetValue():gsub("\"", "")
end
Menu.HandleSubTab = function(self)
    if self:GetGroup() == self.LastSelectedBox then return end
    self.LastSelectedBox = self:GetGroup()
    Menu.Slider:SetValue(BacktrackValues[self.LastSelectedBox])
end
Menu.HandleValueRounding = function(value)
    if value % 5 == 4 then 
        value = value - 4
    elseif value % 5 == 1 then 
        value = value + 4
    else 
        value = value - value % 5
    end
    Menu.Slider:SetValue(value)
    return value
end
Menu.HandleValue = function(self)
    if BacktrackValues[Menu.LastSelectedBox] == self.Slider:GetValue() then return end
    BacktrackValues[self.LastSelectedBox] = Menu.HandleValueRounding(self.Slider:GetValue())
    Config:Save()
end
Menu.Handle = function(self)
    self:HandleSubTab()
    self:HandleValue()
end
Menu.Slider:SetDescription("How many positions in past are allowed.")

Config = {
    Exists = function()
        local out = false
        file.Enumerate(function(f) if f == cfgName then out = true return end end)
        return out
    end,
    Create = function()
        local f = file.Open(cfgName, "w")
        local text = ""
        for k,v in pairs(BacktrackValues) do
            text = text .. v .. ","
        end
        f:Write(text)
        f:Close()
    end,
    Load = function(self)
        if not self.Exists() then self.Create() end
        local cfgFile = file.Open(cfgName, "r")
        local data = cfgFile:Read()
        local values = {}
        for v in data:gmatch("(.-),") do table.insert(values, v) end
        local i = 1
        for k,v in pairs(BacktrackValues) do
            BacktrackValues[k] = values[i]
            i = i + 1
        end
    end,
    Save = function(self)
        self.Create()
    end
}
Config:Load()

callbacks.Register("Draw", function()
    Menu:Handle()
    gui.SetValue("lbot.extra.backtrack", BacktrackValues[Menu.LastSelectedBox])
end)
