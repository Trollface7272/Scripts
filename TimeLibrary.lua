-- Note that the first few calls will every time return nil
-- It's due to API limitations
-- panorama.RunScript is not Asynchronous
-- Meaning that we can't just wait for the script to finish executing
-- Resulting in convar not changing when we read it for first few times
TimeLib = {
    Raw = -1,
    Offset = -1,
    Now = -1,
    _Init = function(self)
        client.SetConVar("panorama_dump_events_backlog", "nil", true)
        panorama.RunScript([[var now = new Date();var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());var diff = now.getTime() - midnight.getTime();GameInterfaceAPI.ConsoleCommand('panorama_dump_events_backlog ' + diff);]])
        self.Raw = tonumber(client.GetConVar("panorama_dump_events_backlog"))
        self.Offset = globals.RealTime()
    end,
    CheckInvalidity = function(self)
        if self.Raw == nil or self.Raw < 10 then self.Raw = tonumber(client.GetConVar("panorama_dump_events_backlog")) return true end
        self:UpdateNow()
        return false 
    end,
    UpdateNow = function(self)
        self.Now = math.floor((self.Raw + ((globals.RealTime() - self.Offset) * 1000)) / 1000)
    end,
    FillZeros = function(input)
        if type(input) ~= "string" then input = tostring(input) end
        if input:len() < 2 then input = "0" .. input end
        return input
    end,
    GetTime = function(self)
        if self:CheckInvalidity() then return end
        local o = {}
        o.Hours   = self:GetHours()
        o.Minutes = self:GetMinutes()
        o.Seconds = self:GetSeconds()
        return o
    end,
    GetHours = function(self)
        if self:CheckInvalidity() then return end
        return self.FillZeros(math.floor(self.Now / 60 / 60))
    end,
    GetMinutes = function(self)
        if self:CheckInvalidity() then return end
        return self.FillZeros(math.floor(self.Now / 60 % 60))
    end,
    GetSeconds = function(self)
        if self:CheckInvalidity() then return end
        return self.FillZeros(self.Now % 60)
    end
}
TimeLib:_Init()
