//UI
UI.AddSliderInt("", 0, 0)
UI.AddLabel("[---------------Misc---------------]")
UI.AddDropdown("Epic Clantags", [ "Disabled", "Random", "BigMilk", "Project-Infinity", "gamesense", "Singularity", "Insanity Cheats"])
UI.AddCheckbox("Epic Hitsay")
UI.AddCheckbox("Epic Panorama Blur Disabler")
UI.AddCheckbox("Epic Skeet Hitlogs")
UI.AddCheckbox("Epic Music Kit Changer")
UI.AddSliderInt("Epic Music Kit", 1, 50)
UI.AddHotkey("Epic Door Spam")
UI.AddLabel("[--------------Visual---------------]")
UI.AddCheckbox("Epic Team Based Model Changer")
UI.AddDropdown("CT Agent", ["None", "\'TwoTimes\' McCoy", "Seal Team 6 Solider", "Buckshot", "Lt. Commander Ricksaw"])
UI.AddDropdown("T Agent", ["None", "Dragomir", "Rezan The Ready", "Maximus"])
UI.AddCheckbox("Epic Viewmodel Spin")
UI.AddSliderInt("Epic Spin Speed", 1, 10)
UI.AddCheckbox("Epic Aspect Ratio Changer")
UI.AddSliderFloat("Epic Aspect Ratio", 0, 5)
UI.AddCheckbox("Epic Party Mode")
UI.AddCheckbox("Epic Chicken Changer")
UI.AddDropdown("Epic Chicken Model", ["None", "Party", "Ghost", "Christmas", "Bunny", "Pumpkin"])
UI.AddSliderInt("Epic Chicken Scale", 1, 100)
UI.AddDropdown("Epic Chicken Animation Changer", ["None", "Slowmotion", "T-Pose", "Stroke", "Disable Animations", "Speed"])
UI.AddSliderInt("Epic Chicken Speed", 1, 20)
UI.AddSliderFloat("Epic Chicken Slowmotion", 0, 1)
UI.AddDropdown("Epic Fish Changer", ["default", "Stool", "Lamp", "Cofee Mug", "Plant", "Door", "Broken Door", "Frying Pan", "Pot", "Cofee Machine", "Milk"])
UI.AddLabel("[-------------Anti-Aim-------------]")
UI.AddCheckbox("Epic Anti-Bruteforce")
UI.AddCheckbox("Epic Disable Fakelag On Shot")
UI.AddCheckbox("Epic Low Delta")
UI.AddLabel("[-------------Ragebot-------------]")
UI.AddHotkey("Epic Force Onshot")
UI.AddCheckbox("Epic Min Damage Override")
UI.AddHotkey("Min Damage Override")
UI.AddSliderInt("General", 0, 130)
UI.AddSliderInt("Pistol", 0, 130)
UI.AddSliderInt("Heavy Pistol", 0, 130)
UI.AddSliderInt("Scout", 0, 130)
UI.AddSliderInt("AWP", 0, 130)
UI.AddSliderInt("Auto Sniper", 0, 130)
UI.AddSliderInt("", 0, 0)

//Local variables
const Prefix = ["breathtaking","cool","awesome","ahahahahah that","trash","good","cant tell if u are serious about that","pls give","send selly link for that sick","amazing","fantastic","crazy","interesting","mcdonalds","laughting my ass of that","nice fucking","insane","lidl","sick","astonishing","nice","u sell that","refund that","lol that","shit","xDDDDDDD that","u pay for that","nice pasted","LOL that","top","best","superior","get good get","nice public","nice private","one step ahead of your"]
const Suffix = ["lagswitch","mother","account","settings","paste","internet","resolver","serverside","imaginary girlfriend","death","kd","keybind","osiris","skeet","vip hack","computer","1","gamingcarpet","negative IQ","config","gamesense","steeringwheel assistence","antiaim","uid issue","visuals","lethality","knifechanger","pasta","brain","cheat","skinchanger","mindmg","miss","baim","onshot","haram","media","safepoints","fanta","toes","IQ","window capture"]
const hitgroup = ['Head', 'Head', 'Pelvis', 'Body', 'Chest', 'Chest', 'Chest', 'Left leg', 'Right leg', 'Left leg', 'Right leg', 'Left leg', 'Right foot', 'Left arm', 'Right arm', 'Left arm', 'Left arm', 'Right arm', 'Right arm'];
var clantagLastTime = 0
var clantagActive = false
var rollOffset = 0
var rollDirection = true
var shouldFakelag = false
var duckingPlayers = []
var use = true
var fsjdnhsjd = Render.GetScreenSize()
var screenX = fsjdnhsjd[0]
var screenY = fsjdnhsjd[1] 
var specListX = screenX/128 
var specListY = screenY/12
var onShottable = []
var currentMinDmg = {
    General: UI.GetValue("Rage", "GENERAL", "Targeting", "Minimum damage"),
    Pistol: UI.GetValue("Rage", "PISTOL", "Targeting", "Minimum damage"),
    HeavyPistol: UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage"),
    Scout: UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage"),
    AWP: UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage"),
    Autosniper: UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
}
var clearOn = {
    RoundEnd: false, 
    RoundStart: false, 
    GameEnd: false, 
    GameStart: false, 
}
var shots = {
    Ragebot: [],
    WeaponFire: [],
    PlayerHurt: []
}

//UI Manager
function ScriptItemsManager() {
    var MinDmgOvr = UI.GetValue("Epic Min Damage Override")
    var MusicKit = UI.GetValue("Epic Music Kit Changer")
    var ModelChanger = UI.GetValue("Epic Team Based Model Changer")
    var EpicSpin = UI.GetValue("Epic Viewmodel Spin")
    var AspectRatio = UI.GetValue("Epic Aspect Ratio Changer")
    var ChickenChanger = UI.GetValue("Epic Chicken Changer")
    var ChickenAnims = UI.GetValue("Epic Chicken Animation Changer")

    UI.SetEnabled("Min Damage Override", MinDmgOvr)
    UI.SetEnabled("General", MinDmgOvr)
    UI.SetEnabled("Pistol", MinDmgOvr)
    UI.SetEnabled("Heavy Pistol", MinDmgOvr)
    UI.SetEnabled("Scout", MinDmgOvr)
    UI.SetEnabled("AWP", MinDmgOvr)
    UI.SetEnabled("Auto Sniper", MinDmgOvr)

    UI.SetEnabled("Epic Music Kit", MusicKit)

    UI.SetEnabled("CT Agent", ModelChanger)
    UI.SetEnabled("T Agent", ModelChanger)

    UI.SetEnabled("Epic Spin Speed", EpicSpin)

    UI.SetEnabled("Epic Aspect Ratio", AspectRatio)

    UI.SetEnabled("Epic Chicken Model", ChickenChanger)
    UI.SetEnabled("Epic Chicken Scale", ChickenChanger)
    UI.SetEnabled("Epic Chicken Animation Changer", ChickenChanger)
    UI.SetEnabled("Epic Chicken Slowmotion", ChickenChanger && (ChickenAnims == 1))
    UI.SetEnabled("Epic Chicken Speed", ChickenChanger && (ChickenAnims == 5))

}
//Features
function HitSay() {
    if(!UI.GetValue("Script Items", "Epic Hitsay")) return
    var attacker = Event.GetInt("attacker")
    if(Entity.GetEntityFromUserID(attacker) == Entity.GetLocalPlayer()) {
        var text = Prefix[Rand(0, Prefix.length)] + " " + Suffix[Rand(0, Suffix.length)]
        Cheat.ExecuteCommand("say " + text)
    }
}

function SetClantag() {
    var tag = UI.GetValue("Script Items", "Epic Clantags")
    var time = parseInt((Globals.Curtime()))
    if(tag == 2) time = parseInt(Globals.Curtime() * 2)
    if(tag == 4) time = parseInt(Globals.Curtime() * 3)
    if(tag == 6) time = parseInt(Globals.Curtime() * 2)
    if (time != clantagLastTime) {
        switch (tag) {
            case 0:
                if(clantagActive) {
                    Local.SetClanTag("")
                    clantagActive = false
                }
                break;
            case 1:
                Local.SetClanTag(RandomString(12))
                clantagActive = true
                break;
            case 2:
                switch((time) % 38) {
                    case 37: case 0: { Local.SetClanTag("l"); break; }
                    case 36: case 1: { Local.SetClanTag("l3"); break; }
                    case 35: case 2: { Local.SetClanTag("B"); break; }
                    case 34: case 3: { Local.SetClanTag("B1"); break; }
                    case 33: case 4: { Local.SetClanTag("Bi"); break; }
                    case 32: case 5: { Local.SetClanTag("Bi9"); break; }
                    case 31: case 6: { Local.SetClanTag("Big"); break; }
                    case 30: case 7: { Local.SetClanTag("Big|"); break; }
                    case 29: case 8: { Local.SetClanTag("Big|\\"); break; }
                    case 28: case 9: { Local.SetClanTag("Big|\\/"); break; }
                    case 27: case 10:{ Local.SetClanTag("Big|\\/|"); break; }
                    case 26: case 11:{ Local.SetClanTag("BigM"); break; }
                    case 25: case 12:{ Local.SetClanTag("BigM1"); break; }
                    case 24: case 13:{ Local.SetClanTag("BigMi"); break; }
                    case 23: case 14:{ Local.SetClanTag("BigMi|"); break; }
                    case 22: case 15:{ Local.SetClanTag("BigMil"); break; }
                    case 21: case 16:{ Local.SetClanTag("BigMil|"); break; }
                    case 20: case 17:{ Local.SetClanTag("BigMil|€"); break; }
                    case 19: case 18:{ Local.SetClanTag("BigMilk"); break; }
                }
                clantagActive = true
                break;
            case 3:
                switch((time) % 19) {
                    case 18: case 0:          { Local.SetClanTag("-"); break; }
                    case 17: case 1:          { Local.SetClanTag("P-I"); break; }
                    case 16: case 2:          { Local.SetClanTag("Pr-In"); break; }
                    case 15: case 3:          { Local.SetClanTag("Pro-Inf"); break; }
                    case 14: case 4:          { Local.SetClanTag("Proj-Infi"); break; }
                    case 13: case 5:          { Local.SetClanTag("Proje-Infin"); break; }
                    case 12: case 6:          { Local.SetClanTag("Projec-Infini"); break; }
                    case 11: case 7:          { Local.SetClanTag("Project-Infinit"); break; }
                             case 8:          { Local.SetClanTag("ProjectInfinity"); break; }
                }
                clantagActive = true
                break;
            case 4:
                switch(time % 38) {
                    case 0:  { Local.SetClanTag("         "); break; }
                    case 1:  { Local.SetClanTag("        g"); break; }
                    case 2:  { Local.SetClanTag("       ga"); break; }
                    case 3:  { Local.SetClanTag("      gam"); break; }
                    case 4:  { Local.SetClanTag("     game"); break; }
                    case 5:  { Local.SetClanTag("    games"); break; }
                    case 6:  { Local.SetClanTag("   gamese"); break; }
                    case 7:  { Local.SetClanTag("  gamesen"); break; }
                    case 8:  { Local.SetClanTag(" gamesens"); break; }
                    case 9:  { Local.SetClanTag("gamesense"); break; }
                    case 20: { Local.SetClanTag(" amesense"); break; }
                    case 21: { Local.SetClanTag("  mesense"); break; }
                    case 22: { Local.SetClanTag("   esense"); break; }
                    case 23: { Local.SetClanTag("    sense"); break; }
                    case 24: { Local.SetClanTag("     ense"); break; }
                    case 25: { Local.SetClanTag("      nse"); break; }
                    case 26: { Local.SetClanTag("       se"); break; }
                    case 27: { Local.SetClanTag("        e"); break; }
                    case 28: { Local.SetClanTag("         "); break; }
                }
                clantagActive = true
                break;
            case 5:
                switch(time % 21) {
                    case 0:   { Local.SetClanTag("S---------y"); break; }
                    case 1:   { Local.SetClanTag("Si-------ty"); break; }
                    case 2:   { Local.SetClanTag("Sin-----ity"); break; }
                    case 3:   { Local.SetClanTag("Sing---rity"); break; }
                    case 4:   { Local.SetClanTag("Singu-arity"); break; }
                    case 5:   { Local.SetClanTag("Singularity"); break; }
                    case 10:  { Local.SetClanTag("-ingularit-"); break; }
                    case 11:  { Local.SetClanTag("--ngulari--"); break; }
                    case 12:  { Local.SetClanTag("---gular---"); break; }
                    case 13:  { Local.SetClanTag("----ula----"); break; }
                    case 14:  { Local.SetClanTag("-----l-----"); break; }
                    case 15:  { Local.SetClanTag("-----------"); break; }
                }
                break;
            case 6:
                switch(time % 31) {
                    case 0:   { Local.SetClanTag("???????? ??????"); break; }
                    case 1:   { Local.SetClanTag("??s????? ??????"); break; }
                    case 2:   { Local.SetClanTag("??s????? ??e???"); break; }
                    case 3:   { Local.SetClanTag("??s??i?? ??e???"); break; }
                    case 4:   { Local.SetClanTag("??s??i?? ??e?t?"); break; }
                    case 5:   { Local.SetClanTag("I?s??i?? ??e?t?"); break; }
                    case 10:  { Local.SetClanTag("I?s??i?? ?he?ts"); break; }
                    case 11:  { Local.SetClanTag("Ins??i?? ?he?ts"); break; }
                    case 12:  { Local.SetClanTag("Insa?i?? ?he?ts"); break; }
                    case 13:  { Local.SetClanTag("Insa?i?? Che?ts"); break; }
                    case 14:  { Local.SetClanTag("Insani?? Che?ts"); break; }
                    case 15:  { Local.SetClanTag("Insani?y Che?ts"); break; }
                    case 16:  { Local.SetClanTag("Insanity Che?ts"); break; }
                    case 17:  { Local.SetClanTag("Insanity Cheats"); break; }
                    case 18:  { Local.SetClanTag("Ins?nity Cheats"); break; }
                    case 19:  { Local.SetClanTag("Ins?nity Ch?ats"); break; }
                    case 20:  { Local.SetClanTag("Ins?n?ty Ch?ats"); break; }
                    case 21:  { Local.SetClanTag("Ins?n?ty ?h?ats"); break; }
                    case 22:  { Local.SetClanTag("Ins?n?ty ?h?at?"); break; }
                    case 23:  { Local.SetClanTag("?ns?n?ty ?h?at?"); break; }
                    case 24:  { Local.SetClanTag("?ns?n?t? ?h?at?"); break; }
                    case 25:  { Local.SetClanTag("?n??n?t? ?h?at?"); break; }
                    case 26:  { Local.SetClanTag("?n??n?t? ?h??t?"); break; }
                    case 27:  { Local.SetClanTag("?n????t? ?h??t?"); break; }
                    case 28:  { Local.SetClanTag("?n????t? ????t?"); break; }
                    case 29:  { Local.SetClanTag("??????t? ????t?"); break; }
                    case 30:  { Local.SetClanTag("???????? ????t?"); break; }
                }
                clantagActive = true
                break;
            default:
                break;
        }
    }
    clantagLastTime = time
}

function SetMinDamage() {
    if(UI.IsHotkeyActive("Script Items", "Min damage override")) {
        UI.SetValue("Rage", "GENERAL", "Targeting", "Minimum damage", UI.GetValue("Script Items", "General"))
        UI.SetValue("Rage", "PISTOL", "Targeting", "Minimum damage", UI.GetValue("Script Items", "Pistol"))
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage", UI.GetValue("Script Items", "Heavy Pistol"))
        UI.SetValue("Rage", "SCOUT", "Targeting", "Minimum damage", UI.GetValue("Script Items", "Scout"))
        UI.SetValue("Rage", "AWP", "Targeting", "Minimum damage", UI.GetValue("Script Items", "AWP"))
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage", UI.GetValue("Script Items", "Auto Sniper"))
    }else {
        UI.SetValue("Rage", "GENERAL", "Targeting", "Minimum damage", currentMinDmg.General)
        UI.SetValue("Rage", "PISTOL", "Targeting", "Minimum damage", currentMinDmg.Pistol)
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage", currentMinDmg.HeavyPistol)
        UI.SetValue("Rage", "SCOUT", "Targeting", "Minimum damage", currentMinDmg.Scout)
        UI.SetValue("Rage", "AWP", "Targeting", "Minimum damage", currentMinDmg.AWP)
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage", currentMinDmg.Autosniper)
    }
}

function AntiBruteforce() {
    if(UI.GetValue("Script Items", "Epic Anti-Bruteforce")) {
        var userid = Event.GetInt("userid")
        if(Entity.IsEnemy(Entity.GetEntityFromUserID(userid))) {
            UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
        }
    }
}

function MusicKitChanger() {
    Entity.SetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_nMusicID", UI.GetValue("Epic Music Kit"))
}

function ForceOnShotCreateMove() {
    if(!UI.IsHotkeyActive("Script Items", "Epic Force Onshot")) return
    var enemies = Entity.GetEnemies()
    if(enemies < 1) return
    for(var i = 0; i < enemies.length; i++) {
        var el = enemies[i]
        var onShottableIndex = -1
        for (var j=0; j < onShottable.length; j++) {
            if (onShottable[j].id == el) {
                onShottableIndex = j
                break
            }
        }
        if(Entity.IsAlive(el) && !Entity.IsBot(el)) {
            if(onShottableIndex == -1) {
                Ragebot.IgnoreTarget(el)
            }else if(onShottableIndex != -1) {
                Ragebot.ForceTargetSafety(el)
                Ragebot.ForceTargetMinimumDamage(el, 100)
                Ragebot.ForceTarget(el)
            }
        }
    }
}
function ForceOnShotWeaponFire() {
    var userid = Event.GetInt("userid")
    var entity = Entity.GetEntityFromUserID(userid)
    if(Entity.IsEnemy(entity) && Entity.IsAlive(entity)) {
        onShottable.push({id: entity, time: Globals.Realtime() + 0.3})
    }
}
function ForceOnShotDraw() {
    for(var i = 0; i < onShottable.length; i++)
        if(Globals.Realtime() > onShottable[i].time)
            onShottable.shift()
}

function SkeetHitLogs() {
    if(!UI.GetValue("Epic Skeet Hitlogs")) return
    var attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"))
    var hurted = Entity.GetEntityFromUserID(Event.GetInt("userid"))
    if(attacker != Entity.GetLocalPlayer() && hurted != Entity.GetLocalPlayer()) return
    var weapon = Event.GetString("weapon")
    var damage = Event.GetInt("dmg_health")
    var health = Event.GetInt("healts")
    var attackerName = Entity.GetName(attacker).replace(/[^a-zA-Z0-9]+/g, "")
    var hurtName = Entity.GetName(hurted).replace(/[^a-zA-Z0-9]+/g, "")
    var hitbox = "in the " + hitgroup[Event.GetInt("hitgroup")]
    var type
    if(hurted == Entity.GetLocalPlayer() || attacker == Entity.GetLocalPlayer()) {
        switch (weapon) {
            case "knife":
                type = "Knifed"
                hitbox = "generic"
                break;
            case"incgrenade":
            case "molotov":
                type = "Burned"
                hitbox = "generic"
                break;
            case "hegrenade":
                type = "Naded"
                hitbox = "generic"
                break;
            case "taser":
                type = "Tased"
                break;
            default:
                type = "Hit"
                break;
        }
    }
    if(attacker == Entity.GetLocalPlayer()) {
        Cheat.PrintColor([0, 255, 0, 255], "[gamesense] ")
        Cheat.Print(type+' '+hurtName+' '+hitbox+' for ')
        Cheat.PrintColor([0, 255, 0, 255], damage + "")
        Cheat.Print(' damage (')
        Cheat.PrintColor([0, 255, 0, 255], health + "")
        Cheat.Print(' health left)\n')
    }else if(hurted == Entity.GetLocalPlayer()) {
        Cheat.PrintColor([0, 255, 0, 255], "[gamesense] ")
        Cheat.Print('Hurt by '+attackerName+' '+hitbox+' for ')
        Cheat.PrintColor([255, 0, 0, 255], damage + "")
        Cheat.Print(' damage (')
        Cheat.PrintColor([255, 0, 0, 255], health + "")
        Cheat.Print(' health left)\n')
    }
}

function DisablePanoramaBlur() {
    if(UI.GetValue("Script Items", "Epic Panorama Blur Disabler"))
        Convar.SetString("@panorama_disable_blur", "1")
    else
        Convar.SetString("@panorama_disable_blur", "0")
}

function SpinViewmodel() {
    if(UI.GetValue("Epic Viewmodel Spin")) {
        var speed = UI.GetValue("Epic Spin Speed")
        if(rollDirection) rollOffset += speed
        else rollOffset -= speed
        if(rollOffset > 40) rollDirection = false
        if(rollOffset < -40) rollDirection = true
        UI.SetValue("Misc", "SKINS", "Viewmodel", "Roll", rollOffset)
    }
}

function SetModels() {
    var teamNum = Entity.GetProp(Entity.GetLocalPlayer(), "CBaseEntity", "m_iTeamNum")
    if(teamNum == 3) {
        var value = UI.GetValue("Script Items", "CT Agent")
        UI.SetValue("Misc", "SKINS", "Player", "Player model", value)
    }else if(teamNum == 2){
        var value = UI.GetValue("Script Items", "T Agent")
        if(value > 0) value += 4
        UI.SetValue("Misc", "SKINS", "Player", "Player model", value)
    }
}

function MissLogDraw() {
    if(UI.GetValue("Script Items", "Epic Skeet Hitlogs") && shots.Ragebot.length > 0) {
        
        var RageBot = shots.Ragebot
        var WeaponFire = shots.WeaponFire
        var PlayerHurt = shots.PlayerHurt

        var time = RageBot[0].time
        var playerid = RageBot[0].id
        var hitchance = RageBot[0].hitchance
        //var damage = RageBot[0].damage
        var hitbox = RageBot[0].hitbox
        var safety = RageBot[0].safety
        var inaccuracy = RageBot[0].inaccuracy
        var playerName = Entity.GetName(playerid).replace(/[^a-zA-Z0-9]+/g, "")
        var WeaponFireIndex = -1
        var PlayerHurtIndex = -1
        for(var i = 0; i < WeaponFire.length; i++) {
            if(WeaponFire[i].time >= time - 0.5 && WeaponFire[i].time <= time + 0.5) {
                WeaponFireIndex = i
                break
            }
        }
        for(var i = 0; i < PlayerHurt.length; i++) {
            if(PlayerHurt[i].time >= time - 0.5 && PlayerHurt[i].time <= time + 0.5) {
                PlayerHurtIndex = i
                break
            }
        }
        if(PlayerHurtIndex != -1) {
            var info = PlayerHurt[PlayerHurtIndex]
            var attacker = info.attacker
            var hurt = info.hurt
            var weapon = info.weapon
            var hitDamage = info.damage
            var health = info.health
            var attackerName = Entity.GetName(attacker).replace(/[^a-zA-Z0-9]+/g, "")
            var hurtName = Entity.GetName(hurt).replace(/[^a-zA-Z0-9]+/g, "")
            var hitHitbox = "in the " + hitgroup[info.hitgroup]
            var type
            if(hurt == Entity.GetLocalPlayer() || attacker == Entity.GetLocalPlayer()) {
                switch (weapon) {
                    case "knife":
                        type = "Knifed"
                        hitHitbox = "generic"
                        break;
                    case "incgrenade":
                    case "molotov":
                        type = "Burned"
                        hitHitbox = "generic"
                        break;
                    case "hegrenade":
                        type = "Naded"
                        hitHitbox = "generic"
                        break;
                    case "taser":
                        type = "Tased"
                        break;
                    default:
                        type = "Hit"
                        break;
                }
            }
            if(attacker == Entity.GetLocalPlayer()) {
                Cheat.PrintColor([0, 255, 0, 255], "[gamesense] ")
                Cheat.Print(type +" "+ hurtName +" "+ hitHitbox +" for ")
                Cheat.PrintColor([0, 255, 0, 255], hitDamage + "")
                Cheat.Print(" damage (")
                Cheat.PrintColor([0, 255, 0, 255], health + "")
                Cheat.Print(" health left; hc="+ hitchance +/*"; dmg="+ damage +*/"; hitbox="+ hitbox +"; safety="+ safety +")\n")
            }else if(hurt == Entity.GetLocalPlayer()) {
                Cheat.PrintColor([0, 255, 0, 255], "[gamesense] ")
                Cheat.Print("Hurt by "+ attackerName +" "+ hitHitbox +" for ")
                Cheat.PrintColor([255, 0, 0, 255], hitDamage + "")
                Cheat.Print(" damage (")
                Cheat.PrintColor([255, 0, 0, 255], health + "")
                Cheat.Print(" health left)\n")
            }
            shots.Ragebot.shift()
            shots.PlayerHurt = RemoveIndex(PlayerHurtIndex, shots.PlayerHurt)
            shots.WeaponFire = RemoveIndex(WeaponFireIndex, shots.WeaponFire)
        } else if(time+0.2 < Globals.Curtime()){
            shots.Ragebot.shift()
            shots.WeaponFire = RemoveIndex(WeaponFireIndex, shots.WeaponFire)
            Cheat.PrintColor([0, 255, 0, 255], "[gamesense] ")
            var reason = hitchance > 75 ? "animation desync" : "spread"
            reason = inaccuracy >= 1 ? "inaccuracy" : reason
            reason = Entity.GetProp(playerid, "CCSPlayer", "m_bGunGameImmunity") ? "Spawn Imunity" : reason
            Cheat.Print("Missed "+ playerName +" due to ")
            Cheat.PrintColor([255, 0, 0, 255], reason)
            Cheat.Print(" (hc="+ hitchance +/*"; dmg="+ damage +*/"; hitbox="+ hitbox +"; safety="+ safety +"; inaccuracy="+ inaccuracy +"degrees)\n")       
        }
    }
}
function MissLogWeaponFire() {
    if(!UI.GetValue("Epic Skeet Hitlogs")) return
    var user = Entity.GetEntityFromUserID(Event.GetInt("userid"))
    var lp = Entity.GetLocalPlayer()
    if(lp == user) {
        shots.WeaponFire.push({time: Globals.Curtime()})
    }
}
function MissLogPlayerHurt() {
    if(!UI.GetValue("Rage", "GENERAL", "General", "Enabled") || Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {
        SkeetHitLogs()
        return
    }
    if(!UI.GetValue("Epic Skeet Hitlogs")) return
    var user = Entity.GetEntityFromUserID(Event.GetInt("attacker"))
    var lp = Entity.GetLocalPlayer()
    if(lp == user) {
        shots.PlayerHurt.push({
            time: Globals.Curtime(),
            weapon: Event.GetString("weapon"),
            damage: Event.GetInt("dmg_health"),
            health: Event.GetInt("health"),
            attacker: Entity.GetEntityFromUserID(Event.GetInt("attacker")),
            hurt: Entity.GetEntityFromUserID(Event.GetInt("userid")),
            hitgroup: Event.GetInt("hitbox")
        })
    }
}
function MissLogRbotFire() {
    if(!UI.GetValue("Epic Skeet Hitlogs")) return
    shots.Ragebot.push({
        time: Globals.Curtime(), 
        id: Ragebot.GetTarget(),
        hitchance: Event.GetInt("hitchance"),
        damage: Event.GetInt("mindamage"),
        hitbox: hitgroup[Event.GetInt("hitbox")],
        safety: Event.GetInt("safepoint"),
        inaccuracy: ((Local.GetInaccuracy() * 100) + "").substring(0, 4)
    })
}

function DoorSpam() {
    if(UI.IsHotkeyActive("Script Items", "Epic Door Spam")) {
        if(use) Cheat.ExecuteCommand("+use")
        else Cheat.ExecuteCommand("-use")
        use = !use
    }else if(!use) {
        Cheat.ExecuteCommand("-use")
        use = true
    }
}

function ChangeAspectRatio() {
    if(UI.GetValue("Epic Aspect Ratio Changer")) {
        Cheat.ExecuteCommand("r_aspectratio " + UI.GetValue("Epic Aspect Ratio"))
    }else {
        Cheat.ExecuteCommand("r_aspectratio 0")
    }
}

function DisableFakelagOnShotCM() {
    if(UI.GetValue("Epic Disable Fakelag On Shot")) {
        UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", shouldFakelag)
        if(!shouldFakelag) shouldFakelag = !shouldFakelag
    }
}
function DisableFakelagOnShotRF() {
    if(UI.GetValue("Epic Disable Fakelag On Shot"))
        shouldFakelag = false
}

function ChickenChanger() {
    var chickens = Entity.GetEntitiesByClassID(36)
    for(var i = 0; i < chickens.length; i++) {
        Entity.SetProp(chickens[i], "CBaseAnimating", "m_nBody", UI.GetValue("Epic Chicken Model"))
        Entity.SetProp(chickens[i], "CBaseAnimating", "m_flModelScale", UI.GetValue("Epic Chicken Scale"))
        Entity.SetProp(chickens[i], "CBaseAnimating", "m_bClientSideAnimation", true)
        Entity.SetProp(chickens[i], "CBaseAnimating", "m_flPlaybackRate", 1)
        Entity.SetProp(chickens[i], "CBaseAnimating", "m_flFrozen", 0)
        
        //Cheat.Print(Entity.GetProp(chickens[i], "CBaseEntity", "m_flAnimTime") + "\n") 
        switch (UI.GetValue("Epic Chicken Animation Changer")) {
            case 1:
                Entity.SetProp(chickens[i], "CBaseAnimating", "m_flFrozen", UI.GetValue("Epic Chicken Slowmotion"))
                break
            case 2:
                Entity.SetProp(chickens[i], "CBaseAnimating", "m_nSequence", 0)
                break
            case 3:
                Entity.SetProp(chickens[i], "CBaseAnimating", "m_flCycle", Math.random())
                break
            case 4:
                Entity.SetProp(chickens[i], "CBaseAnimating", "m_bClientSideAnimation", false)
                break
            case 5:
                Entity.SetProp(chickens[i], "CBaseAnimating", "m_flPlaybackRate", UI.GetValue("Epic Chicken Speed"))
                break
            default:
                break
        }
    }
}

function PartyMode() {
    if(UI.GetValue("Epic Party Mode"))
        Convar.SetString("sv_party_mode", "1")
    else
        Convar.SetString("sv_party_mode", "0")
}

function InstaDuckIndicator() {
    var players = Entity.GetPlayers()
    for(var i = 0; i < players.length; i++) {
        var duckSpeed = Entity.GetProp(players[i], "CBasePlayer", "m_flDuckSpeed")
        var duckAmount = Entity.GetProp(players[i], "CBasePlayer", "m_flDuckAmount")
        if((!duckingPlayers[players[i]]) || duckingPlayers[players[i]].ducking == false) {
            if(duckSpeed == 8 && duckAmount < 1 && duckAmount > 0) {
                if(!duckingPlayers[players[i]]) {
                    duckingPlayers[players[i]] = {
                        ducking: duckAmount > 0 && duckAmount < 1,
                        instaducks: 1
                    }
                }else {duckingPlayers[players[i]].instaducks++}
                Cheat.Print(Entity.GetName(players[i]) + " instaducked "+ duckingPlayers[players[i]].instaducks +" times\n")
            }
        }
        if(!duckingPlayers[players[i]]) {
            duckingPlayers[players[i]] = {
                ducking: duckAmount > 0 && duckAmount < 1,
                instaducks: 0
            }
        }else {
            duckingPlayers[players[i]].ducking = duckAmount > 0 && duckAmount < 1
        }
    }
}

function FishChanger() {
    var fishes = Entity.GetEntitiesByClassID(75)
    var UIval = UI.GetValue("Epic Fish Changer")
    var skin
    switch (UIval) {
        case 0:
            skin = 718
            break;
        case 1:
            skin = 720
            break;
        case 2:
            skin = 721
            break;
        case 3:
            skin = 724
            break;
        case 4:
            skin = 725
            break;
        case 5:
            skin = 734
            break;
        case 6:
            skin = 741
            break;
        case 7:
            skin = 752
            break;
        case 8:
            skin = 753
            break;
        case 9:
            skin = 754
            break;
        case 10:
            skin = 755
            break;
        default:
            break;
    }
    for(var i = 0; i < fishes.length; i++) 
        Entity.SetProp(fishes[i], "CFish", "m_nModelIndex", skin)
}

function SpectatorList() {
    SpectatorListMove()
    var speed = 5
    var r1 = Math.floor(Math.sin(Global.Realtime() * speed) * 127 + 128)
    var g1 = Math.floor(Math.sin(Global.Realtime() * speed + 2) * 127 + 128)
    var b1 = Math.floor(Math.sin(Global.Realtime() * speed + 4) * 127 + 128)
    var r2 = Math.floor(Math.sin((Global.Realtime()+1) * speed) * 127 + 128)
    var g2 = Math.floor(Math.sin((Global.Realtime()+1) * speed + 2) * 127 + 128)
    var b2 = Math.floor(Math.sin((Global.Realtime()+1) * speed + 4) * 127 + 128)
    var a = 128

    Render.FilledRect(specListX, specListY+25, 220, 120, [100,100,100,100])
    Render.FilledRect(specListX, specListY, 220, 20, [0,0,0,255])
    Render.GradientRect(specListX, specListY, 220, 20, 1, [r1, g1, b1, 200], [r2, g2, b2, 200])
    Render.Rect(specListX, specListY, 220, 20, [0,0,0,255])
    Render.String(specListX+50, specListY+2, 0, "Spectator List", [0, 0, 0, 255], 12)

    Render.GradientRect(specListX, specListY + 25, 220, 120, 0, [r1, g1, b1, 100], [r2, g2, b2, 100])
}

function SpectatorListMove() {
    var position = Input.GetCursorPosition()
    var keyPressed = Input.IsKeyPressed(1)
    var x = position[0]
    var y = position[1]
    if(keyPressed && (x > specListX && x < specListX + 220) && (y > specListY && y < specListY + 20)) Cheat.Print("1")
}

function LowDelta() {
    if(!UI.GetValue("Epic Low Delta")) return
    var dir = UI.IsHotkeyActive("Anti-Aim", "Fake Angles", "Inverter")
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 10);
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
    AntiAim.SetOverride(1);
    AntiAim.SetFakeOffset(0);
    AntiAim.SetRealOffset(dir ? -26 : 26);
}

//Callback Handlers
function onDraw() {
    SetClantag()
    ScriptItemsManager()
    MusicKitChanger()
    ForceOnShotDraw()
    DisablePanoramaBlur()
    SpinViewmodel()
    MissLogDraw()
    ChickenChanger()
    PartyMode()
    InstaDuckIndicator()
    FishChanger()
    //SpectatorList()
}
Cheat.RegisterCallback("Draw", "onDraw")

function onCreateMove() {
    SetMinDamage()
    ForceOnShotCreateMove()
    SetModels()
    DoorSpam()
    DisableFakelagOnShotCM()
    ChangeAspectRatio()
    LowDelta()
}
Cheat.RegisterCallback("CreateMove", "onCreateMove")

function onPlayerHurt() {
    HitSay()
    //SkeetHitLogs()
    MissLogPlayerHurt()
}
Cheat.RegisterCallback("player_hurt", "onPlayerHurt")

function onWeaponFire() {
    AntiBruteforce()
    ForceOnShotWeaponFire()
    MissLogWeaponFire()
}
Cheat.RegisterCallback("weapon_fire", "onWeaponFire")

function onRageBotFire() {
    MissLogRbotFire()
    DisableFakelagOnShotRF()
}
Cheat.RegisterCallback("ragebot_fire", "onRageBotFire")

function Rand(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min
}

function RandomString(length) {
    var result           = ''
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

function Find(key, myArray){
    if(onShottable.length == 0) return -1
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id == key) {
            return i
        }
    }
    return -1
}

function RemoveIndex(index, array) {
    var final = []
    for(var i = 0; i < array.length; i++) 
        if(i != index) final.push(array[i])
    return final;
}
  


Cheat.ExecuteCommand("clear")