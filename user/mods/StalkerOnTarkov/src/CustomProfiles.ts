/*
 * author: ShadowXtrex,
 * Version: 392.0.1
 * Date: 18/07/2024
 */

//Dependencies
import { DependencyContainer } from "tsyringe";
//Loaders
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
//Database
import { DatabaseServer } from "@spt/servers/DatabaseServer";
//Controllers
import { ProfileController } from "@spt/controllers/ProfileController";
//Services
import { DatabaseService } from "@spt/services/DatabaseService";
//Utils
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { VFS } from "@spt/utils/VFS";
import { jsonc } from "jsonc";

//Path To Tarkov oriented progile
import { Stalker } from "./Profiles/0_StalkerOnTarkov";
import { Stalkereasy } from "./Profiles/1_StalkerOnTarkovEasy";
import { Stalkerhard } from "./Profiles/2_StalkerOnTarkovHard";

// Other Changes
import { ProfileChanges } from "./Extras/ProfileChanges";

import path from "path";

const SELECTED_PROFILE = "Stalker On Tarkov";

const keepOnlyStalkerOnTarkovProfile = (container: DependencyContainer) => {
  container.afterResolution<DatabaseService>(
    "DatabaseService",
    (_t, result): void => {
      const dbService = Array.isArray(result) ? result[0] : result;
      const originalGetProfiles = dbService.getProfiles.bind(dbService);

      dbService.getProfiles = () => {
        const profileTemplates = originalGetProfiles();
        const selectedProfileTemplate = profileTemplates[SELECTED_PROFILE];

        if (selectedProfileTemplate) {
          return {
            [SELECTED_PROFILE]: profileTemplates[SELECTED_PROFILE],
          };
        }

        return profileTemplates;
      };
    },
    { frequency: "Always" }
  );
};

class CustomProfiles implements IPostDBLoadMod {
  private modInfo = require("../package.json");
  private logger: ILogger;
  private vfs: VFS;
  public postDBLoad(container: DependencyContainer): void {
    this.logger = container.resolve<ILogger>("WinstonLogger");
    this.vfs = container.resolve<VFS>("VFS");

    const contentStalker = new Stalker();
    const contentStalkereasy = new Stalkereasy();
    const contentStalkerhard = new Stalkerhard();

    const accountExtras = new ProfileChanges();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Profiles, Extras } = jsonc.parse(
      this.vfs.readFile(path.resolve(__dirname, "../config/config.jsonc"))
    );
    // SOT
    if (typeof Profiles.CharlyPofiles.stalker === "boolean") {
      if (Profiles.CharlyPofiles.stalker === true) {
        contentStalker.stalker_profile(container);
      }
    }
    if (typeof Profiles.CharlyPofiles.stalkereasy === "boolean") {
      if (Profiles.CharlyPofiles.stalkereasy === true) {
        contentStalkereasy.stalker_profile_easy(container);
      }
    }
    if (typeof Profiles.CharlyPofiles.stalkerhard === "boolean") {
      if (Profiles.CharlyPofiles.stalkerhard === true) {
        contentStalkerhard.stalker_profile_hard(container);
      }
    }

    // Extras
    if (typeof Extras.ProfileChanges.tassorts === "boolean") {
      if (Extras.ProfileChanges.tassorts === true) {
        accountExtras.trader_assorts(container);
      }
    }
    if (typeof Extras.ProfileChanges.unheard === "boolean") {
      if (Extras.ProfileChanges.unheard === true) {
        accountExtras.char_pockets(container);
      }
    }

    // Trap's edit
    keepOnlyStalkerOnTarkovProfile(container);
  }
}
module.exports = { mod: new CustomProfiles() };
