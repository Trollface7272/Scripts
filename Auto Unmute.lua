local function Unmute(index)
    panorama.RunScript([[
        (function a() {
            let xuid = GameStateAPI.GetPlayerXuidStringFromEntIndex(]].. index ..[[)
            let isMuted = GameStateAPI.IsSelectedPlayerMuted(xuid)
            if (isMuted) GameStateAPI.ToggleMute(xuid)
        })()
    ]])
end

callbacks.Register("FireGameEvent", function(e)
    if e:GetName() ~= "player_team" then return end
    if e:GetInt("disconnect") == 1 then return end
    local index = entities.GetByUserID(e:GetInt("userid")):GetIndex()
    if index == client.GetLocalPlayerIndex() then 
        local ent = entities.FindByClass("CCSPlayer")
        for k,v in pairs(ent) do
            Unmute(v:GetIndex())
        end
        return
    end
    Unmute(index)
end)
client.AllowListener("player_team")
