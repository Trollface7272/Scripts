local js = http.Get("https://raw.githubusercontent.com/Trollface7272/Scripts/main/invchanger.js")
local time = 0
local function RunScript(script)
	if panorama.RunScript then
		panorama.RunScript(script)
	end
	if panorama.loadstring then
		panorama.loadstring(script, "CSGOMainMenu")()
	end
end

local function onDraw()
	if globals.TickCount() - time > 64 then
		RunScript(js)
	end
end

callbacks.Register("Draw", onDraw)
