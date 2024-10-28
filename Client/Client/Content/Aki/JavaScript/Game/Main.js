"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MainMenu = void 0);
const puerts_1 = require("puerts"),
UE = require("ue");

async function mount() {
    const modPath = UE.BlueprintPathsLibrary.RootDir() + "Mod";
    const files = UE.KuroStaticLibrary.GetFilesRecursive(modPath, "*.pak");
    for (let e = 0; e < files.Num(); e++) {
        UE.KuroPakMountStatic.MountPak(files.Get(e), 1e5);
    }
}

async function main() {
    await mount();
    // let the game launch if failed to load
    try {
        // wait for mount, then this require will work
        let Load = require("./ModMenu");
        
        if (Load) {
            new Load.MainMenu({
                loadFromLauncher: true,
            });
        }
    } catch {}
    const GameProcedure_1 = require("./GameProcedure"); // this has to be here for the pak to load first
    GameProcedure_1.GameProcedure.Start(puerts_1.argv.getByName("GameInstance"));
}

main();
//# sourceMappingURL=Main.js.map
