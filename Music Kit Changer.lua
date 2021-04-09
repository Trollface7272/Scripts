local MusicKitChanger = {}
MusicKitChanger.List = {"Off", "Default", "Broken", "Daniel Sadowski, Crimson Assault", "Noisia, Sharpened", "Robert Allaire, Insurgency", "Sean Murray, A*D*8", "Feed Me, High Noon", "Dren, Death's Head Demolition", "Austin Wintory, Desert Fire", "Sasha, LNOE", "Skog, Metal", "Midnight Riders, All I Want for Christmas", "Matt Lange, IsoRhythm", "Mateo Messina, For No Mankind", "Various Artists, Hotline Miami", "Daniel Sadowski, Total Domination", "Damjan Mravunac, The Talos Principle", "Proxy, Battlepack", "Ki:Theory, MOLOTOV", "Troels Folmann, Uber Blasto Phone", "Kelly Bailey, Hazardous Environments", "Skog, II-Headshot", "Daniel Sadowski, The 8-Bit Kit", "AWOLNATION, I Am", "Mord Fustang, Diamonds", "Michael Bross, Invasion!", "Ian Hultquist, Lion's Mouth", "New Beat Fund, Sponge Fingerz", "Beartooth, Disgusting", "Lennie Moore, Java Havana Funkaloo", "Darude, Moments CSGO", "Beartooth, Aggressive", "Blitz Kids, The Good Youth", "Hundredth, FREE", "Neck Deep, Life's Not Out To Get You", "Roam, Backbone", "Twin Atlantic, GLA", "Skorg, III-Arena", "The Verkkars, EZ4ENCE", "The Master Chief Collection, Halo", "King, Scar by Scarlxrd", "Anti-Citizen, Mike Morasky (Valve)", "Austin Wintory, Bachram", "Dren, Gunman Taco Truck", "Daniel Sadowski, Eye of the Dragon", "Tree Adams and Ben Bromfield, M.U.D.D. FORCE", "Tim Huling, Neo Noir", "Sam Marshall, Bodacious", "Matt Levine, Drifter", "Amon Tobin, All for Dust", "Darren Korb, Hades", "Neck Deep, The Lowlife Pack", "Scarlxrd, CHAIN$AW.LXADXUT."}
MusicKitChanger.Gui = gui.Combobox(gui.Reference("Visuals", "Other", "Extra"), "", "Music Kit Changer", unpack(MusicKitChanger.List))
MusicKitChanger.Gui:SetDescription("Changes your music kit.")
MusicKitChanger.Fire = function()
    if entities.GetLocalPlayer() == nil then return end
    local kit = MusicKitChanger.Gui:GetValue()
    if kit == 0 then return end
    entities.GetPlayerResources():SetPropInt(kit, "m_nMusicID", client.GetLocalPlayerIndex())
end


callbacks.Register("Draw", function()
    MusicKitChanger.Fire()
end)
