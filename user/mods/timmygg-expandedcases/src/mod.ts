import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";

class Mod implements IPostDBLoadMod {
  private modConfig = require("../config/config.json");

  public postDBLoad(container: DependencyContainer): void {
    // get database from server
    const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

    // Get all the in-memory json found in /assets/database
    const tables = databaseServer.getTables();

    const logger = container.resolve<ILogger>("WinstonLogger");

    // Money Case
    tables.templates.items[
      "59fb016586f7746d0d4b423a"
    ]._props.Grids[0]._props.cellsH = 10;
    tables.templates.items[
      "59fb016586f7746d0d4b423a"
    ]._props.Grids[0]._props.cellsV = 10;

    // Keycard Holder
    tables.templates.items[
      "619cbf9e0a7c3a1a2731940a"
    ]._props.Grids[0]._props.cellsH = 5;
    tables.templates.items[
      "619cbf9e0a7c3a1a2731940a"
    ]._props.Grids[0]._props.cellsV = 7;

    // Key Tool
    tables.templates.items[
      "59fafd4b86f7745ca07e1232"
    ]._props.Grids[0]._props.cellsH = 10;
    tables.templates.items[
      "59fafd4b86f7745ca07e1232"
    ]._props.Grids[0]._props.cellsV = 10;

    // Medicine Case
    tables.templates.items[
      "5aafbcd986f7745e590fff23"
    ]._props.Grids[0]._props.cellsH = 8;
    tables.templates.items[
      "5aafbcd986f7745e590fff23"
    ]._props.Grids[0]._props.cellsV = 9;

    // Magazine Case
    tables.templates.items[
      "5c127c4486f7745625356c13"
    ]._props.Grids[0]._props.cellsH = 9;
    tables.templates.items[
      "5c127c4486f7745625356c13"
    ]._props.Grids[0]._props.cellsV = 9;

    // Ammunition Case
    tables.templates.items[
      "5aafbde786f774389d0cbc0f"
    ]._props.Grids[0]._props.cellsH = 8;
    tables.templates.items[
      "5aafbde786f774389d0cbc0f"
    ]._props.Grids[0]._props.cellsV = 9;

    // Injectors Case
    tables.templates.items[
      "619cbf7d23893217ec30b689"
    ]._props.Grids[0]._props.cellsH = 6;
    tables.templates.items[
      "619cbf7d23893217ec30b689"
    ]._props.Grids[0]._props.cellsV = 6;

    // THICC Weapons Case
    tables.templates.items[
      "5b6d9ce188a4501afc1b2b25"
    ]._props.Grids[0]._props.cellsH = 8;
    tables.templates.items[
      "5b6d9ce188a4501afc1b2b25"
    ]._props.Grids[0]._props.cellsV = 16;

    // Weapons Case
    tables.templates.items[
      "59fb023c86f7746d0d4b423c"
    ]._props.Grids[0]._props.cellsH = 7;
    tables.templates.items[
      "59fb023c86f7746d0d4b423c"
    ]._props.Grids[0]._props.cellsV = 10;

    // Wallet WZ
    tables.templates.items[
      "60b0f6c058e0b0481a09ad11"
    ]._props.Grids[0]._props.cellsH = 3;
    tables.templates.items[
      "60b0f6c058e0b0481a09ad11"
    ]._props.Grids[0]._props.cellsV = 2;

    // GP Coin Stack Size to config.json Value
    tables.templates.items["5d235b4d86f7742e017bc88a"]._props.StackMaxSize =
      this.modConfig.GPCoin;

    logger.logWithColor(
      `GP Coin Stack Size changed to: ${this.modConfig.GPCoin}`,
      LogTextColor.MAGENTA
    );
    logger.logWithColor(
      "[ExpandedCases]: Loaded successfully.",
      LogTextColor.GREEN
    );
  }
}

module.exports = { mod: new Mod() };
