local Ref = gui.Reference("Misc", "Enhancement", "Appearance")
local Menu = {
    Enable = gui.Checkbox(Ref, "customtag", "Custom Clantag Enable", false),
    Mode = gui.Combobox(Ref, "customtag.mode", "Custom Clantag Mode", "Static", "Rotate", "Marquee", "Arabic"),
    Text = gui.Editbox(Ref, "customtag.text", ""),
}

local Clantag = {
    reverse = " ‮",
    tag = {},
    ffi = {
        _SetClantag = ffi.cast("int(__fastcall*)(const char*, const char*)", mem.FindPattern("engine.dll", "53 56 57 8B DA 8B F9 FF 15")),
        _LastTag = "",
        SetClantag = function(self, tag)
            if tag == self._LastTag then return end
            self._SetClantag(tag, tag)
            self._LastTag = tag
        end
    },
    CreateTag = function(self, tag)
        local val = Menu.Mode:GetValue()
        if val == 0 then
            self:StaticTag(tag)
        elseif val == 1 then
            self:RotateTag(tag)
        elseif val == 2 then
            self:MarqueeTag(tag)
        elseif val == 3 then
            self:ArabicTag(tag)
        end
    end,
    ArabicTag = function(self, tag)
        local out = {}
        table.insert(out, self.reverse .. tag:reverse())
        for i = 1, #tag do
            table.insert(out, tag:sub(1, i) .. self.reverse .. tag:sub(i+1, #tag):reverse())
        end
    
        for i = #out - 1, 1, -1 do
            table.insert(out, out[i])
        end
        self.tag = out
    end,
    MarqueeTag = function(self, tag)
        local tbl = {}
        local out = {}
        tag:gsub(".", function(t) table.insert(tbl, t)end)
        
        for i = 1, #tbl do
            local str = ""
            str = str .. table.concat(tbl, "", i)
            for j = 1, i do str = " " .. str end
            table.insert(out, str)
        end
        table.insert(out, "")
        for i = 1, #tbl do
            local str = ""
            str = str .. table.concat(tbl, "", 1, i)
            for j = 1, i do str = str .. " " end
            table.insert(out, str)
        end
        self.tag = out
    end,
    StaticTag = function(self, tag)
        self.tag = {tag}
    end,
    RotateTag = function(self, tag)
        local curTag = tag
        local out = {tag}
        for i = 1, #tag do
            curTag = curTag:sub(#curTag) .. curTag:sub(1, -2)
            table.insert(out, curTag)
        end
        self.tag = out
    end,
    DrawHook = function(self)
        if not Menu.Enable:GetValue() then if self.ffi._LastTag ~= "" then self.ffi:SetClantag("") end return end
        if not entities.GetLocalPlayer() then return end

        local index = math.floor(math.fmod(globals.TickCount() / 32, #self.tag + 1) + 1)

        if self.tag[index] == nil then return end

        self.ffi:SetClantag(self.tag[index])
    end,
    UnloadHook = function(self)
        if self.ffi._LastTag ~= "" then self.ffi:SetClantag("") end
    end
}

gui.Button(Ref, "Set Clantag", function() Clantag:CreateTag(Menu.Text:GetValue()) end)

callbacks.Register("Draw", function()
    Clantag:DrawHook()
end)

callbacks.Register("Unload", function()
    Clantag:UnloadHook()
end)
