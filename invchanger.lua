local function RunScript(script)
	if panorama.RunScript then
		panorama.RunScript(script)
	end
	if panorama.loadstring then
		panorama.loadstring(script, "CSGOMainMenu")()
	end
end

local js = http.Get("https://raw.githubusercontent.com/Trollface7272/Scripts/main/invchanger.js")
RunScript(js)