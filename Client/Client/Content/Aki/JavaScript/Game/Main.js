"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MainMenu = void 0);
const puerts_1 = require("puerts"),
UE = require("ue");

async function mount() {
    let modPath = UE.BlueprintPathsLibrary.RootDir() + "Mod";
    let files = UE.KuroStaticLibrary.GetFilesRecursive(modPath, "*.pak");
    for (let e = 0; e < files.Num(); e++) {
        let f = files.Get(e);
        UE.KuroPakMountStatic.MountPak(f, 1e5);
    }
}

async function main() {
    await mount();
    setTimeout(() => {
        // wait for mount, then this require will work
        const Load = require("./ModMenu");
        // let the game launch anyway
        if (Load) {
            new Load.MainMenu({
                loadFromLauncher: true,
            });
        }
        
        const GameProcedure_1 = require("./GameProcedure"); // this has to be here for the pak to load first
        GameProcedure_1.GameProcedure.Start(puerts_1.argv.getByName("GameInstance"));
    }, 250);
}

main();
//# sourceMappingURL=Main.js.map
