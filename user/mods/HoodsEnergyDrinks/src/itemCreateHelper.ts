import { DependencyContainer } from "tsyringe";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { VFS } from "@spt/utils/VFS";
import { jsonc } from "jsonc";
import path from "path";
import { Buffs } from "./buffs";

export class ItemCreateHelper {

    public config: any;
    public loot: Array<NewItemFromCloneDetails> = [];

    // Create customs Items and store them in the database
    public createItems(container: DependencyContainer) {
        const db: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const vfs = container.resolve<VFS>("VFS");
        this.config = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config/config.jsonc"))).config;
        const customItem = container.resolve<CustomItemService>("CustomItemService");

        const buffs = new Buffs();
        let green_monster_buffs: Array<any> = this.config['monster_green_effect_toggle'] ? buffs.green_monster_buffs : [];
        let blue_monster_buffs: Array<any> = this.config['monster_blue_effect_toggle'] ? buffs.blue_monster_buffs : [];
        let white_monster_buffs: Array<any> = this.config['monster_white_effect_toggle'] ? buffs.white_monster_buffs : [];
        let strawberry_monster_buffs: Array<any> = this.config['monster_strawberry_effect_toggle'] ? buffs.strawberry_monster_buffs : [];
        let ghost_energy_buffs: Array<any> = this.config['ghost_effect_toggle'] ? buffs.ghost_energy_buffs : [];
        let nos_energy_buffs: Array<any> = this.config['nos_effect_toggle'] ? buffs.nos_energy_buffs : [];
        let punch_monster_buffs: Array<any> = this.config['monster_punch_effect_toggle'] ? buffs.punch_monster_buffs : [];
        let bang_energy_buffs: Array<any> = this.config['bang_effect_toggle'] ? buffs.bang_energy_buffs : [];
        let doctor_buffs: Array<any> = this.config['monster_doctor_effect_toggle'] ? buffs.doctor_buffs : [];
        let lemonade_monster_buffs: Array<any> = this.config['monster_lemonade_effect_toggle'] ? buffs.lemonade_monster_buffs : [];
        let redbull_original_buffs: Array<any> = this.config['redbull_effect_toggle'] ? buffs.redbull_original_buffs : [];
        let redbull_watermelon_buffs: Array<any> = this.config['redbull_watermelon_effect_toggle'] ? buffs.redbull_watermelon_buffs : [];

        // Add the custom buff to globals config
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_monster_energy"] = green_monster_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_blue_monster_energy"] = blue_monster_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_monster_white_energy"] = white_monster_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_monster_strawberry_energy"] = strawberry_monster_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_ghost_energy"] = ghost_energy_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_nos_energy"] = nos_energy_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_monster_lemonade_energy"] = lemonade_monster_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_bang_energy"] = bang_energy_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_monster_doctor_energy"] = doctor_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_monster_punch_energy"] = punch_monster_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_redbull_original_energy"] = redbull_original_buffs;
        db.tableData.globals.config.Health.Effects.Stimulator.Buffs["Buffs_drink_redbull_watermelon_energy"] = redbull_watermelon_buffs;

        const monester_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_monster_energy",
                effects_health: {
                },

                effects_damage: {

                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb161", 
            fleaPriceRoubles: this.config['monster_green_flea_price'],
            handbookPriceRoubles: 50000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Original Green Energy Drink",
                    shortName: "Monster",
                    description: `The Original Green Monster Energy Drink is Tarkov's most scavenged and desired energy drink. Scavs and PMCs alike horde this beverage for both for its taste and affects, which help keep their energy and stamina up longer during raids.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_green_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_green_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_green_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_green_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_green_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_green_loose_loot_multiplier"]
        }

        this.loot.push(monester_energy);

        const monester_energy_blue: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_blue.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_blue_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_blue_monster_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb160", 
            fleaPriceRoubles: this.config['monster_blue_flea_price'],
            handbookPriceRoubles: 40000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Original Lo-Carb Energy Drink",
                    shortName: "Monster",
                    description: `The Lo-Carb Monster Energy Drink is a favorite among scavs that have a taste for increased their ability in scavenging faster and staying alert longer in-raid. Monster Energy Lo-Carb packs a powerful punch and has a smooth, easy drinking flavor, but without glucose. Get the big bad Monster buzz you know and love, but with a sweet & salty citrus twist with a fraction of the carbohydrates and only 30 calories per can and with 140mg of Caffeine.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_blue_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_blue_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_blue_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_blue_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_blue_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_blue_loose_loot_multiplier"]
        }

        this.loot.push(monester_energy_blue);

        const monester_energy_white: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_white.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_white_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_monster_white_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb162", 
            fleaPriceRoubles: this.config['monster_white_flea_price'],
            handbookPriceRoubles: 55000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Zero Ultra Energy Drink",
                    shortName: "Monster",
                    description: `The light, refreshing citrus flavor of Zero Ultra has broken the rules of flavor. 10 calories, zero sugar, and a full load of our Monster Energy blend to keep the good times rolling.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_white_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_white_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_white_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_white_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_white_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_white_loose_loot_multiplier"]
        }

        this.loot.push(monester_energy_white);

        const monester_energy_strawberry: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_strawberry.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_strawberry_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_monster_strawberry_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb163", 
            fleaPriceRoubles: this.config['monster_strawberry_flea_price'],
            handbookPriceRoubles: 62500,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Zero-Ultra Strawberry Dreams Energy Drink",
                    shortName: "Monster",
                    description: `Take just one sip and you'll be crazy for Ultra Strawberry Dreams. Wonderfully sweet, while slightly tart, this easy-drinking Ultra tastes like a dream. Packed with the Monster Energy blend you love, with just 10 calories and zero sugar.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_strawberry_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_strawberry_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_strawberry_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_strawberry_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_strawberry_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_strawberry_loose_loot_multiplier"]
        }

        this.loot.push(monester_energy_strawberry);

        const ghost_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/ghost_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/ghost_energy_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_ghost_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb174", 
            fleaPriceRoubles: this.config['ghost_flea_price'],
            handbookPriceRoubles: 65000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Ghost Strawbango Margarita Energy Drink",
                    shortName: "Ghost",
                    description: `Ghost Energy is the fully transparent, fully loaded energy drink we have all been waiting for. Our legendary energy drink features no sugar, no artificial colors, and authentic Strawbango Margarita flavor. It contains 200mg of Natural Caffeine from coffee beans, which has been found anecdotally to deliver a smooth, feel-good energy with less jitters and no crash when compared to other forms of caffeine.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["ghost_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["ghost_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["ghost_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["ghost_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["ghost_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["ghost_loose_loot_multiplier"]
        }

        this.loot.push(ghost_energy);

        const nos_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/nos_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/nos_energy_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_nos_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb175", 
            fleaPriceRoubles: this.config['nos_flea_price'],
            handbookPriceRoubles: 70000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "NOS Original Energy Drink",
                    shortName: "NOS",
                    description: `Fuel Up. Fire Up. 100 mile an hour power. Thundering from top gear to no fear, the super-charged take charge. It's time to strap in, or sit it out. How Hard Will You Drive? High Performance Energy.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["nos_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["nos_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["nos_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["nos_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["nos_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["nos_loose_loot_multiplier"]
        }

        this.loot.push(nos_energy);

        const monester_energy_punch: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_punch.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_punch_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_monster_punch_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb176", 
            fleaPriceRoubles: this.config['monster_punch_flea_price'],
            handbookPriceRoubles: 100000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Juice Pipeline Punch Energy Drink",
                    shortName: "Monster",
                    description: `Like the Banzai Pipeline of Oahu, Pipeline Punch was destined to become a legend. The perfect carbonated blend of passion fruit, orange, guava, and our Monster Energy blend.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_punch_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_punch_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_punch_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_punch_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_punch_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_punch_loose_loot_multiplier"]
        }

        this.loot.push(monester_energy_punch);

        const bang_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/bang_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/bang_energy_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_bang_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb177", 
            fleaPriceRoubles: this.config['bang_flea_price'],
            handbookPriceRoubles: 105000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Bang Rainbow Unicorn Energy Drink",
                    shortName: "Bang",
                    description: `Bang is not your stereotypical high sugar, life-sucking soda masquerading as an energy drink! High sugar drinks spike blood sugar producing metabolic mayhem causing you to crash harder than a test dummy into a brick wall. Every 16-ounce can of Bang contains 300 milligrams of caffeine, which studies have shown may increase endurance, as well as strength in some cases, along with essential amino acids, CoQ10 and Super Creatine.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["bang_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["bang_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["bang_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["bang_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["bang_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["bang_loot_loose_loot_multiplier"]
        }

        this.loot.push(bang_energy);

        const monester_energy_doctor: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_doctor.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_doctor_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_monster_doctor_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb178", 
            fleaPriceRoubles: this.config['monster_doctor_flea_price'],
            handbookPriceRoubles: 115000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster The Doctor Energy Drink",
                    shortName: "Monster",
                    description: `Monster Energy Valentino Rossi VR46 500ml Carbonated Energy Drink and 160mg caffeine. VR46 tastes unlike traditional energy drinks with a light, crisp and refreshing citrus taste. We teamed up with MotoGP Champion, Valentino Rossi AKA ""The Doctor"", to create our fastest Monster yet. Serve cold for maximum refreshment.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_doctor_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_doctor_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_doctor_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_doctor_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_doctor_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_doctor_loose_loot_multiplier"]
        }

        this.loot.push(monester_energy_doctor);

        const monester_energy_lemonade: NewItemFromCloneDetails = {
            itemTplToClone: "5d40407c86f774318526545a",
            overrideProperties: {
                Prefab: {
                    path: "assets/monster_energy_lemonade.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/monster_energy_lemonade_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_monster_lemonade_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb179", 
            fleaPriceRoubles: this.config['monster_lemonade_flea_price'],
            handbookPriceRoubles: 135000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Monster Juice Aussie Lemonade Energy Drink",
                    shortName: "Monster",
                    description: `Inspired by the land down under and powered by our world-famous Monster Energy blend, Aussie Style Lemonade is a carbonated exotic twist on lemonade. Tart yet sweet, with a burst of fresh citrus flavor.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["monster_lemonade_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["monster_lemonade_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["monster_lemonade_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["monster_lemonade_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["monster_lemonade_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["monster_lemonade_loose_loot_multiplier"]
        }

        this.loot.push(monester_energy_lemonade);

        const redbull_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5751496424597720a27126da",
            overrideProperties: {
                Prefab: {
                    path: "assets/redbull_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/redbull_energy_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_redbull_original_energy",
                effects_health: {
                },

                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb180", 
            fleaPriceRoubles: this.config['redbull_flea_price'],
            handbookPriceRoubles: 65000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Red Bull Energy Drink",
                    shortName: "Red Bull",
                    description: `Red Bull Energy Drink gives you Wiiings whenever you need them. Red Bull is a lightly carbonated energy drink with an impeccable blend of caffeine, taurine, B vitamins, real sugar and water. With 110 calories per 8.4 fl oz can, Red Bull is great for any occasion. While aiming for great heights during your workday, in your workouts or when gaming, why not crack open a refreshing can of Red Bull?.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["redbull_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["redbull_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["redbull_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["redbull_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["redbull_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["redbull_loose_loot_multiplier"]
        }

        this.loot.push(redbull_energy);

        const redbull_watermelon_energy: NewItemFromCloneDetails = {
            itemTplToClone: "5751496424597720a27126da",
            overrideProperties: {
                Prefab: {
                    path: "assets/redbull_watermelon_energy.bundle",
                    rcid: ""
                },
                UsePrefab: {
                    path: "assets/redbull_watermelon_energy_container.bundle",
                    rcid: ""
                },
                foodUseTime: 5,
                StimulatorBuffs: "Buffs_drink_redbull_watermelon_energy",
                effects_health: {
                },
                
                effects_damage: {
                    
                }
            },
            parentId: "5448e8d64bdc2dce718b4568",
            newId: "66ccf66fc9162d12270bb181", 
            fleaPriceRoubles: this.config['redbull_watermelon_flea_price'],
            handbookPriceRoubles: 95000,
            handbookParentId: "5b47574386f77428ca22b335",
            locales: {
                "en": {
                    name: "Red Bull Red Edition Watermelon Energy Drink",
                    shortName: "Red Bull",
                    description: `Red Bull Red Edition Watermelon Energy Drink gives you Wiiings whenever you need them. Red Bull Red Edition is a lightly carbonated energy drink with a blend of caffeine, taurine, B vitamins, real sugar and water, along with the taste of watermelon.`
                }
            },
            addToStaticLoot: {
                "578f87a3245977356274f2cb": this.config["redbull_watermelon_loot_duffle_bag_weight"],
                "5909e4b686f7747f5b744fa4": this.config["redbull_watermelon_loot_dead_scav_weight"],
                "578f8778245977358849a9b5": this.config["redbull_watermelon_loot_jacket_weight"],
                "5d6fd13186f77424ad2a8c69": this.config["redbull_watermelon_loot_ration_supply_crate_weight"],
                "5d6d2b5486f774785c2ba8ea": this.config["redbull_watermelon_loot_ground_cache_weight"],
            },
            looseLootSpawnWeight: this.config["redbull_watermelon_loose_loot_multiplier"]
        }

        this.loot.push(redbull_watermelon_energy);

        
        customItem.createItemFromClone(monester_energy);
        customItem.createItemFromClone(monester_energy_blue);
        customItem.createItemFromClone(monester_energy_white);
        customItem.createItemFromClone(monester_energy_strawberry);
        customItem.createItemFromClone(monester_energy_doctor);
        customItem.createItemFromClone(monester_energy_punch);
        customItem.createItemFromClone(monester_energy_lemonade);
        customItem.createItemFromClone(nos_energy);
        customItem.createItemFromClone(bang_energy);
        customItem.createItemFromClone(ghost_energy);
        customItem.createItemFromClone(redbull_energy);
        customItem.createItemFromClone(redbull_watermelon_energy);
    }
}