"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MainMenu = void 0);
const puerts_1 = require("puerts"),
UE = require("ue"),
  GameProcedure_1 = require("./GameProcedure");

async function mount() {
    let modPath = UE.BlueprintPathsLibrary.RootDir() + "Mod";
    let files = UE.KuroStaticLibrary.GetFilesRecursive(modPath, "*.pak");
    for (let e = 0; e < files.Num(); e++) {
        let f = files.Get(e);
        UE.KuroPakMountStatic.MountPak(f, 4242);
    }
}

async function main() {
    await mount();
    // complete insanity
    const Load = require("./ModMenu");
    new Load.MainMenu({
        loadFromLauncher: true,
    });
    GameProcedure_1.GameProcedure.Start(puerts_1.argv.getByName("GameInstance"));
}

main();
//# sourceMappingURL=Main.js.map
