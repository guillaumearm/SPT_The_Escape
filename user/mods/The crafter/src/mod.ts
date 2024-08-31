import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod"
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"
import { ConfigServer } from "@spt-aki/servers/ConfigServer"
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes"
import { ILogger } from "@spt-aki/models/spt/utils/ILogger"
import config from "../config/config.json"

class the_crafter implements IPostDBLoadMod {
	public postDBLoad(container: DependencyContainer): void {
		const logger = container.resolve<ILogger>("WinstonLogger")
		const databaseServer = container.resolve<DatabaseServer>("DatabaseServer")
		const configServer = container.resolve<ConfigServer>("ConfigServer")
		const tables = databaseServer.getTables()
		const items = tables.templates.items

	//Modify scavcase money into alcohol
	if (config.Drunkedscavs == true) {
	const scavCaseDrink = [
		{
		_id: "6271093e621b0a76055cd61e", ProductionTime: 16800, //Moonshine
		Requirements: [
		{templateId: "5d1b376e86f774252519444e", count: 1, type: "Item"}],
		EndProducts: {Common: {min: 0, max: 0}, Rare: {min: 1, max: 1}, Superrare: {min: 3, max: 5}}},
		{
		_id: "62710a8c403346379e3de9be", ProductionTime: 5500, //Vodka
		Requirements: [
		{templateId: "5d40407c86f774318526545a", count: 1, type: "Item"}],
		EndProducts: {Common: {min: 1, max: 1}, Rare: {min: 1, max: 3}, Superrare: {min: 0, max: 0}}},
		{
		_id: "62710974e71632321e5afd5f", ProductionTime: 7700, //Pevko
		Requirements: [
		{templateId: "62a09f32621468534a797acb", count: 1, type: "Item"}],
		EndProducts: {Common: {min: 1, max: 2}, Rare: {min: 1, max: 1}, Superrare: {min: 0, max: 2}}},
		{
		_id: "62710a0e436dcc0b9c55f4ec", ProductionTime: 19200, //Pevko
		Requirements: [
		{templateId: "5c12613b86f7743bbe2c3f76", count: 1, type: "Item"}],
		EndProducts: {Common: {min: 0, max: 0}, Rare: {min: 2, max: 4}, Superrare: {min: 2, max: 3}}},
		{
		_id: "62710a69adfbd4354d79c58e", ProductionTime: 8100, //Whiskey
		Requirements: [
		{templateId: "5d403f9186f7743cac3f229b", count: 1, type: "Item"}],
		EndProducts: {Common: {min: 0, max: 0}, Rare: {min: 1, max: 3}, Superrare: {min: 1, max: 2}}}]

	logger.log(`Scavs want ALCOHOOOOOL!!!`, "yellow")
	tables.hideout.scavcase = scavCaseDrink}

	//BiggerStash
	if (config.BiggerStash == true) {
		items["566abbc34bdc2d92178b4576"]._props.Grids[0]._props.cellsV = 50
		items["5811ce572459770cba1a34ea"]._props.Grids[0]._props.cellsV = 65
		items["5811ce662459770f6f490f32"]._props.Grids[0]._props.cellsV = 80
		items["5811ce772459770e9e5f9532"]._props.Grids[0]._props.cellsV = 100

	logger.log(`Wow you have so many space now!`, "yellow")}
	
	//CheapStash
	const originalStages = tables.hideout.areas.find((x) => x._id == "5d484fc0654e76006657e0ab").stages

	for (const stage in originalStages) { 
		if (config.CheapStash == true) {
		originalStages[stage].requirements
		.filter((x) => x.templateId == "5449016a4bdc2d6f028b456f" || x.templateId == "569668774bdc2da2298b4568")
		.forEach((x) => {x.count /= 10})}}

	tables.hideout.areas.find((x) => x._id == "5d484fc0654e76006657e0ab").stages = originalStages

	if (config.CheapStash == true) {logger.log(`OOOHHH finally the stash price is not a scam`, "yellow")}

	//Rebalance
	if (config.CraftingRebalance == true) {

		// Clin (1 -> 2)
		getCraft("59e358a886f7741776641ac3").count = 2

		// Paracord (1 -> 2)
		getCraft("5c12688486f77426843c7d32").count = 2

		// Corrugated hose (1 of each, 2 -> 1) 
		getCraft("59e35cbb86f7741778269d83").count = 1
		getCraft("59e35cbb86f7741778269d83").requirements.forEach((x) => {if (x.count) {x.count = 1}})

		// Water filter (Airfilter 4 -> 2)
		getCraft("5d1b385e86f774252167b98a").requirements.find((x) => x.templateId == "590c595c86f7747884343ad7").count = 2

		// EWR (2 -> 3)
		getCraft("60098b1705871270cd5352a1").count = 3

		// Coffee (2 -> 3)
		getCraft("5af0484c86f7740f02001f7f").count = 3

		// Water (8 -> 10)
		getCraft("5448fee04bdc2dbc018b4567").count = 10

		// Aquamari (3 -> 5)
		getCraft("5c0fa877d174af02a012e1cf").count = 5

		// MULE (1 -> 2)
		getCraft("5ed51652f6c34d2cc26336a1").count = 2
		
		// AFAK (IFAK 2 -> 1)
		getCraft("60098ad7c2240c0fe85c570a").requirements.find((x) => x.templateId == "590c678286f77426c9660122").count = 1

		// Portable defibrillator (Wires 3 -> 2, Capacitors 4 -> 2)
		getCraft("5c052e6986f7746b207bc3c9").requirements.forEach((x) => {if (x.count && x.count > 2) {x.count = 2}})

		// LEDX (Magnet/UHF RFID/Powerbank 3 -> 2)
		getCraft("5c0530ee86f774697952d952").requirements.forEach((x) => {if (x.count && x.count > 2) {x.count = 2}})

		// CMS (Medical tools 1 -> 2)
		getCraft("5d02778e86f774203e7dedbe").requirements.find((x) => x.templateId == "619cc01e0a7c3a1a2731940c").count = 2

		// Grizzly (2 -> 1)
		getCraft("590c657e86f77412b013051d").count = 1

		// SJ6 (2 -> 3)
		getCraft("5c0e531d86f7747fa23f4d42").count = 3

		// Topographic survey maps (1 -> 2)
		getCraft("62a0a124de7ac81993580542").count = 2

		// Military flash drive (2 Secure Flash drive -> 1 VPX, Topographic survey maps 2 -> 1, Level 3 -> 2)
		getCraft("62a0a16d0b9d3c46de5b6e97").requirements.forEach((x) => {if (x.count) {x.count = 1}})
		getCraft("62a0a16d0b9d3c46de5b6e97").requirements.find((x) => x.type == "Area").requiredLevel = 2
		getCraft("62a0a16d0b9d3c46de5b6e97").requirements.find((x) => x.templateId == "590c621186f774138d11ea29").templateId = "5c05300686f7746dce784e5d"

		// Intelligence folder (Military flash drive 2 -> 1)
		getCraft("5c12613b86f7743bbe2c3f76").requirements.find((x) => x.templateId == "62a0a16d0b9d3c46de5b6e97").count = 1

		// VPX (RAM/Broken GPhone smartphone 3 -> 2)
		getCraft("5c05300686f7746dce784e5d").requirements.forEach((x) => {if (x.count) {x.count = 2}})

		// Virtex (Military circuit board 2 -> 1)
		getCraft("5c05308086f7746b2101e90b").requirements.find((x) => x.templateId == "5d0376a486f7747d8050965c").count = 1

		// Military circuit board (1 -> 3)
		getCraft("5d0376a486f7747d8050965c").count = 3

		// FLIR (1 of each, SAS drive -> Armasight Vulcan MG 3.5x Bravo night vision scope)
		getCraft("5d1b5e94d7ad1a2b865a96b0").requirements.forEach((x) => {if (x.count) {x.count = 1}})
		getCraft("5d1b5e94d7ad1a2b865a96b0").requirements.find((x) => x.templateId == "590c37d286f77443be3d7827").templateId = "5b3b6e495acfc4330140bd88"

		// GPU (3 VPX -> 1 Virtex, PCB/CPU 10 -> 3)
		getCraft("57347ca924597744596b4e71").requirements.find((x) => x.templateId == "5c05300686f7746dce784e5d").count = 1
		getCraft("57347ca924597744596b4e71").requirements.find((x) => x.templateId == "5c05300686f7746dce784e5d").templateId = "5c05308086f7746b2101e90b"
		getCraft("57347ca924597744596b4e71").requirements.forEach((x) => {if (x.count && x.count > 3) {x.count = 3}})

		// Gas analyzer (1 of each)
		getCraft("590a3efd86f77437d351a25b").requirements.forEach((x) => {if (x.count) {x.count = 1}})

		// Spark plug (1 -> 4)
		getCraft("590a3c0a86f774385a33c450").count = 4

		// GreenBat (1 of each)
		getCraft("5e2aedd986f7746d404f3aa4").requirements.forEach((x) => {if (x.count) {x.count = 1}})

		// Rechargeable battery (2 -> 3)
		getCraft("590a358486f77429692b2790").count = 3

		// 9x19mm AP 6.3 (Kite 2 -> 1)
		getCraft("5c925fa22e221601da359b7b").requirements.find((x) => x.templateId == "590c5a7286f7747884343aea").count = 1

		// 5.56x45mm M855A1 (5.56x45mm M855 180 -> 120)
		getCraft("54527ac44bdc2d36668b4567").requirements.find((x) => x.templateId == "54527a984bdc2d4e668b4567").count = 120
		
		// 5.56x45mm MK 318 Mod 0 (Kite 4 -> 2)
		getCraft("60194943740c5d77f6705eea").requirements.find((x) => x.templateId == "590c5a7286f7747884343aea").count = 2
		
		// 9x19mm RIP (Dry fuel 2 -> 1)
		getCraft("5c0d56a986f774449d5de529").requirements.find((x) => x.templateId == "590a373286f774287540368b").count = 1

		// 12/70 AP-20 armor-piercing slug (Eagle 3 ->1,  50 7mm -> 80 8.5mm)
		getCraft("5d6e68a8a4b9360b6c0d54e2").requirements.find((x) => x.templateId == "5d6fc78386f77449d825f9dc").count = 1
		getCraft("5d6e68a8a4b9360b6c0d54e2").requirements.find((x) => x.templateId == "560d5e524bdc2d25448b4571").count = 80
		getCraft("5d6e68a8a4b9360b6c0d54e2").requirements.find((x) => x.templateId == "560d5e524bdc2d25448b4571").templateId = "5d6e6806a4b936088465b17e"

		// .366 TKM AP-M (9x39mm SPP gs -> 9x39mm sp-6)
		getCraft("5f0596629e22f464da6bbdd9").requirements.find((x) => x.templateId == "5c0d668f86f7747ccb7f13b2").templateId = "57a0e5022459774d1673f889"

		// OFZ 30x160mm shell (1 of each)
		getCraft("5d0379a886f77420407aa271").requirements.forEach((x) => {if (x.count) {x.count = 1}})
		
		// 12/70 Piranha (Kite 3 -> 2)
		getCraft("64b8ee384b75259c590fa89b").requirements.find((x) => x.templateId == "590c5a7286f7747884343aea").count = 2

		// VOG-25 (3 of each)
		getCraft("5e340dcdcb6d5863cc5e5efb").requirements.forEach((x) => {if (x.count) {x.count = 3}})

		// RGD-5 hand grenade (UZRGM grenade fuze 3 -> 2)
		getCraft("5448be9a4bdc2dfd2f8b456a").requirements.find((x) => x.templateId == "5e2af51086f7746d3f3c3402").count = 2

		// "Zarya" stun grenade (1 of each)
		getCraft("5a0c27731526d80618476ac4").requirements.forEach((x) => {if (x.count) {x.count = 1}})

		//Lucky Scav Junk Box (Lavatory 2 -> Intel 1, 2 of each)
		getCraftID("5eeca9bad874f914d2536585").areaType = 11
		getCraftID("5eeca9bad874f914d2536585").requirements.find((x) => x.type == "Area").requiredLevel = 1
		getCraftID("5eeca9bad874f914d2536585").requirements.find((x) => x.type == "Area").areaType = 11
		getCraftID("5eeca9bad874f914d2536585").requirements.forEach((x) => {if (x.count) {x.count = 2}})
		
		//Grenade case (Lavatory 2 -> Intel 1, 2 of each)
		getCraftID("5ffcab66fd851f4b000d61ef").areaType = 11
		getCraftID("5ffcab66fd851f4b000d61ef").requirements.find((x) => x.type == "Area").requiredLevel = 1
		getCraftID("5ffcab66fd851f4b000d61ef").requirements.find((x) => x.type == "Area").areaType = 11
		getCraftID("5ffcab66fd851f4b000d61ef").requirements.forEach((x) => {if (x.count && x.count > 2) {x.count = 2}})

		//Magazine case (Lavatory 2 -> Intel 1, 2 of each)
		getCraftID("5dceeaf100b3815535149f5a").areaType = 11
		getCraftID("5dceeaf100b3815535149f5a").requirements.find((x) => x.type == "Area").requiredLevel = 1
		getCraftID("5dceeaf100b3815535149f5a").requirements.find((x) => x.type == "Area").areaType = 11
		getCraftID("5dceeaf100b3815535149f5a").requirements.forEach((x) => {if (x.count) {x.count = 2}})

		//Weapon repair kit (Workbench 3 -> Intel 2, Weapon parts 10 -> 3, Insulating tape 6 -> 3, Master kit/fire removed)
		getCraftID("629e19eddb6e1a02066676f1").areaType = 11
		getCraftID("629e19eddb6e1a02066676f1").requirements = [
		{templateId: "590c2e1186f77425357b6124", count: 1, type: "Item"},
		{templateId: "544fb5454bdc2df8738b456a", count: 1, type: "Item"},
		{templateId: "5d1c819a86f774771b0acd6c", count: 3, type: "Item"},
		{templateId: "5734795124597738002c6176", count: 3, type: "Item"},
		{areaType: 11, requiredLevel: 2, type: "Area"}]

		//Violet card (AccessLab 10 -> 4, IntelFolder 4 -> 3)
		getCraft("5c1e495a86f7743109743dfb").requirements.find((x) => x.templateId == "5c94bbff86f7747ee735c08f").count = 4
		getCraft("5c1e495a86f7743109743dfb").requirements.find((x) => x.templateId == "5c12613b86f7743bbe2c3f76").count = 3
		
		//Ars Arma A18 Skanda plate carrier (1 of each)
		getCraft("5d5d87f786f77427997cfaef").requirements.forEach((x) => {if (x.count) {x.count = 1}})
		
		//FirstSpear Strandhogg plate carrier (1 of each)
		getCraft("61bcc89aef0f505f0c6cd0fc").requirements.forEach((x) => {if (x.count) {x.count = 1}})
		
		//ANA Tactical M2 plate carrier (Lavatory 3 -> 2)
		getCraft("5ab8dced86f774646209ec87").requirements.find((x) => x.type == "Area").requiredLevel = 2
		
		//Pilgrim tourist backpack (Lavatory 3 -> 2)
		getCraft("59e763f286f7742ee57895da").requirements.find((x) => x.type == "Area").requiredLevel = 2

		logger.log(`Perfectly balanced`, "yellow")}

	function getCraft(endProductID) {return tables.hideout.production.find((x) => x.endProduct == endProductID && x.areaType != 21)}
	function getCraftID(craftID) {return tables.hideout.production.find((x) => x._id == craftID && x.areaType != 21)}

	//Keycards
	if (config.CraftKeycards == true) {
		const AccessLab = {
		_id: "accesslab001", areaType: 11, productionTime: 8640, endProduct: "5c94bbff86f7747ee735c08f", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2c9c86f774245b1f03f2", type: "Tool"},
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "590c639286f774151567fa95", type: "Tool"},
		{templateId: "590a3b0486f7743954552bdb", count: 2, type: "Item"},
		{templateId: "6389c70ca33d8c4cdf4932c6", count: 2, type: "Item"},
		{templateId: "62a09cb7a04c0c5c6e0a84f8", count: 1, type: "Item"},
		{areaType: 11, requiredLevel: 1, type: "Area"}]}

	tables.hideout.production.push(AccessLab)}

	//Ammunitions
	if (config.CraftAmmunitions == true) {
	const a545bt = {
		_id: "the_crafter_545bt", areaType: 10, productionTime: 2160, endProduct: "56dff061d2720bb5668b4567", count: 100, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40425986f7743185265461", type: "Tool"},
		{templateId: "56dfef82d2720bbd668b4567", count: 100, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const a545bs = {
		_id: "the_crafter_545bs", areaType: 10, productionTime: 5220, endProduct: "56dff026d2720bb8668b4567", count: 100, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40425986f7743185265461", type: "Tool"},
		{templateId: "5d63d33b86f7746ea9275524", type: "Tool"},
		{templateId: "56dff061d2720bb5668b4567", count: 100, type: "Item"},
		{templateId: "5d6fc87386f77449db3db94e", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const a5457n40 = {
		_id: "the_crafter_545n40", areaType: 10, productionTime: 4800, endProduct: "61962b617c6c7b169525f168", count: 120, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40425986f7743185265461", type: "Tool"},
		{templateId: "590c2b4386f77425357b6123", type: "Tool"},
		{templateId: "56dff061d2720bb5668b4567", count: 60, type: "Item"},
		{templateId: "56dfef82d2720bbd668b4567", count: 60, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const a556war = {
		_id: "the_crafter_556war", areaType: 10, productionTime: 2410, endProduct: "5c0d5ae286f7741e46554302", count: 40, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40425986f7743185265461", type: "Tool"},
		{templateId: "59e6920f86f77411d82aa167", count: 40, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 1, type: "Item"},
		{templateId: "59e35ef086f7741777737012", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const a556ssa = {
		_id: "the_crafter_556ssa", areaType: 10, productionTime: 6480, endProduct: "601949593ae8f707c4608daa", count: 120, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "54527ac44bdc2d36668b4567", count: 200, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 1, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 2, type: "Item"},
		{templateId: "5d6fc87386f77449db3db94e", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const a556HP = {
		_id: "the_crafter_556HP", areaType: 10, productionTime: 1710, endProduct: "601949593ae8f707c4608daa", count: 120, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "59e6918f86f7746c9f75e849", count: 200, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 2, type: "Item"},
		{areaType: 10, requiredLevel: 1, type: "Area"}]}

	const a762993 = {
		_id: "the_crafter_762993", areaType: 10, productionTime: 576, endProduct: "5efb0c1bd79ff02a1f5e68d9", count: 60, productionLimitCount: 0,
		requirements: [
		{templateId: "5af04b6486f774195a3ebb49",type: "Tool"},
		{templateId: "590c639286f774151567fa95",type: "Tool"},
		{templateId: "5a6086ea4f39f99cd479502f", count: 60, type: "Item"},
		{templateId: "5d6fc87386f77449db3db94e", count: 1, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const a762rbs = {
		_id: "the_crafter_762rbs1", areaType: 10, productionTime: 4800, endProduct: "5e023d48186a883be655e551", count: 40, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "560d61e84bdc2da74d8b4571", count: 40, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 1, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const a338ap = {
		_id: "the_crafter_338ap", areaType: 10, productionTime: 5000, endProduct: "5fc382a9d724d907e2077dab", count: 20, productionLimitCount: 0,
		requirements: [
		{templateId: "5af04b6486f774195a3ebb49", type: "Tool"},
		{templateId: "5fc275cf85fd526b824a571a", count: 20, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 2, type: "Item"},
		{templateId: "5d6fc87386f77449db3db94e", count: 2, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 2, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const abarrikada = {
		_id: "the_crafter_barrikada", areaType: 10, productionTime: 1650, endProduct: "5e85aa1a988a8701445df1f5", count: 8, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "5af04b6486f774195a3ebb49", type: "Tool"},
		{templateId: "590c5a7286f7747884343aea", count: 1, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 1, type: "Item"},
		{templateId: "5d6fc87386f77449db3db94e", count: 1, type: "Item"},
		{templateId: "5d0379a886f77420407aa271", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const aacprip = {
		_id: "the_crafter_acprip", areaType: 10, productionTime: 1440, endProduct: "5ea2a8e200685063ec28c05a", count: 140, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40425986f7743185265461", type: "Tool"},
		{templateId: "5d6fc87386f77449db3db94e", count: 1, type: "Item"},
		{templateId: "5c06782b86f77426df5407d2", count: 4, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const am441he = {
		_id: "the_crafter_m441he", areaType: 10, productionTime: 1400, endProduct: "5ede47405b097655935d7d16", count: 7, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2e1186f77425357b6124", type: "Tool"},
		{templateId: "5656eb674bdc2d35148b457c", count: 4, type: "Item"},
		{templateId: "5e2af51086f7746d3f3c3402", count: 4, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const a762ap = {
		_id: "the_crafter_762ap", areaType: 10, productionTime: 7200, endProduct: "601aa3d2b2bcb34913271e6d", count: 80, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 2, type: "Item"},
		{templateId: "5d6fc87386f77449db3db94e", count: 3, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 3, type: "Item"},
		{templateId: "59e0d99486f7744a32234762", count: 80, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}
	
	const appbs = {
		_id: "the_crafter_appbs", areaType: 10, productionTime: 6127, endProduct: "5c0d5e4486f77478390952fe", count: 100, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2b4386f77425357b6123", type: "Tool"},
		{templateId: "5d40425986f7743185265461", type: "Tool"},
		{templateId: "590c5a7286f7747884343aea", count: 1, type: "Item"},
		{templateId: "5d6fc87386f77449db3db94e", count: 1, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const aps12b = {
		_id: "the_crafter_aps12b", areaType: 10, productionTime: 4752, endProduct: "5cadf6eeae921500134b2799", count: 100, productionLimitCount: 0,
		requirements: [
		{templateId: "619cbfeb6b8a1b37a54eebfa", type: "Tool"},
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "5d0375ff86f774186372f685", count: 2, type: "Item"},
		{templateId: "60391b0fb847c71012789415", count: 2, type: "Item"},
		{templateId: "5cadf6e5ae921500113bb973", count: 100, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const a856a1 = {
		_id: "the_crafter_a856a1", areaType: 10, productionTime: 4490, endProduct: "59e6906286f7746c9f75e847", count: 200, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40425986f7743185265461", type: "Tool"},
		{templateId: "54527a984bdc2d4e668b4567", count: 200, type: "Item"},
		{templateId: "5d6fc87386f77449db3db94e", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const am995 = {
		_id: "the_crafter_am995", areaType: 10, productionTime: 5758, endProduct: "59e690b686f7746c9f75e848", count: 180, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2e1186f77425357b6124", type: "Tool"},
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "54527ac44bdc2d36668b4567", count: 180, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const aspp = {
		_id: "the_crafter_aspp", areaType: 10, productionTime: 3780, endProduct: "5c0d668f86f7747ccb7f13b2", count: 200, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40425986f7743185265461", type: "Tool"},
		{templateId: "57a0dfb82459774d3078b56c", count: 200, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const a921bt = {
		_id: "the_crafter_a921bt", areaType: 10, productionTime: 3150, endProduct: "5a26ac0ec4a28200741e1e18", count: 150, productionLimitCount: 0,
		requirements: [
		{templateId: "5d1b317c86f7742523398392", type: "Tool"},
		{templateId: "5a269f97c4a282000b151807", count: 150, type: "Item"},
		{templateId: "5d6fc87386f77449db3db94e", count: 1, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 1, type: "Item"},
		{templateId: "59e35ef086f7741777737012", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const a12mag = {
		_id: "the_crafter_a12mag", areaType: 10, productionTime: 550, endProduct: "5d6e6806a4b936088465b17e", count: 120, productionLimitCount: 0,
		requirements: [
		{templateId: "560d5e524bdc2d25448b4571", count: 120, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 1, type: "Area"}]}

	const a12rip = {
		_id: "the_crafter_a12rip", areaType: 10, productionTime: 1400, endProduct: "5c0d591486f7744c505b416f", count: 60, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "590c639286f774151567fa95", type: "Tool"},
		{templateId: "5d6e68dea4b9361bcc29e659", count: 60, type: "Item"},
		{templateId: "590c5a7286f7747884343aea", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const am80 = {
		_id: "the_crafter_am80", areaType: 10, productionTime: 3616, endProduct: "58dd3ad986f77403051cba8f", count: 80, productionLimitCount: 0,
		requirements: [
		{templateId: "5d1b31ce86f7742523398394", type: "Tool"},
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "5e023e6e34d52a55c3304f71", count: 80, type: "Item"},
		{templateId: "5d6fc78386f77449d825f9dc", count: 2, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}


	tables.hideout.production.push(a545bt, a545bs, a5457n40, a556war, a556ssa, a762993, a762rbs, a338ap, abarrikada, aacprip, am441he, a762ap, appbs, aps12b, a856a1, am995, aspp, a921bt, a12mag, a12rip, am80, a556HP)}
	
	//Armored rigs
	if (config.CraftArmoredrigs == true) {
	const mk4a = {
		_id: "the_crafter_mk4a", areaType: 2, productionTime: 2700, endProduct: "60a3c70cde5f453f634816a3", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "656fb21fa0dce000a2020f7c", count: 1, type: "Item"},
		{templateId: "5e2af41e86f774755a234b67", count: 2, type: "Item"},
		{templateId: "5e2af4a786f7746d3f3c3400", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	const atacsau = {
		_id: "the_crafter_atacsau", areaType: 2, productionTime: 2340, endProduct: "639343fce101f4caa40a4ef3", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "656fad8c498d1b7e3e071da0", count: 1, type: "Item"},
		{templateId: "5e2af4a786f7746d3f3c3400", count: 1, type: "Item"},
		{templateId: "5e2af4d286f7746d4159f07a", count: 2, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	const crye = {
		_id: "the_crafter_crye", areaType: 2, productionTime: 3000, endProduct: "544a5caa4bdc2d1a388b4568", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "656f9fa0498d1b7e3e071d98", count: 1, type: "Item"},
		{templateId: "5e2af41e86f774755a234b67", count: 1, type: "Item"},
		{templateId: "5e2af4d286f7746d4159f07a", count: 1, type: "Item"},
		{templateId: "5e2af4a786f7746d3f3c3400", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	const cpc = {
		_id: "the_crafter_cpc", areaType: 2, productionTime: 3600, endProduct: "5e4ac41886f77406a511c9a8", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "656fae5f7c2d57afe200c0d7", count: 1, type: "Item"},
		{templateId: "5e2af41e86f774755a234b67", count: 1, type: "Item"},
		{templateId: "5e2af4d286f7746d4159f07a", count: 2, type: "Item"},
		{areaType: 2, requiredLevel: 3, type: "Area"}]}

	const tiger = {
		_id: "the_crafter_tiger", areaType: 2, productionTime: 4320, endProduct: "628cd624459354321c4b7fa2", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "64afdcb83efdfea28601d041", count: 1, type: "Item"},
		{templateId: "5e2af4a786f7746d3f3c3400", count: 2, type: "Item"},
		{areaType: 2, requiredLevel: 3, type: "Area"}]}

	tables.hideout.production.push(mk4a, atacsau, crye, cpc, tiger)}

	//Equipments
	if (config.CraftEquipments == true) {
	const camel = {
		_id: "the_crafter_camel", areaType: 2, productionTime: 450, endProduct: "545cdae64bdc2d39198b4568", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "5ca20d5986f774331e7c9602", count: 1, type: "Item"},
		{templateId: "5e2af47786f7746d404f3aaa", count: 2, type: "Item"},
		{areaType: 2, requiredLevel: 1, type: "Area"}]}

	const ana = {
		_id: "the_crafter_ana", areaType: 2, productionTime: 720, endProduct: "5b44c6ae86f7742d1627baea", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "5ca20d5986f774331e7c9602", count: 1, type: "Item"},
		{templateId: "5e2af41e86f774755a234b67", count: 1, type: "Item"},
		{templateId: "5ab8f04f86f774585f4237d8", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	const ranch = {
		_id: "the_crafter_ranch", areaType: 2, productionTime: 1440, endProduct: "5c0e774286f77468413cc5b2", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "56e33680d2720be2748b4576", count: 1, type: "Item"},
		{templateId: "60a272cc93ef783291411d8e", count: 1, type: "Item"},
		{templateId: "5e2af47786f7746d404f3aaa", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 3, type: "Area"}]}

	const glass = {
		_id: "the_crafter_glass", areaType: 2, productionTime: 180, endProduct: "603409c80ca681766b6a0fb2", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "59e366c186f7741778269d85", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 1, type: "Area"}]}

	const beltab = {
		_id: "the_crafter_beltab", areaType: 2, productionTime: 480, endProduct: "5c0e6a1586f77404597b4965", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "5929a2a086f7744f4b234d43", count: 2, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	const azimut = {
		_id: "the_crafter_azimut", areaType: 2, productionTime: 375, endProduct: "603648ff5a45383c122086ac", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "5e4abc1f86f774069619fbaa", count: 3, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	const lbt = {
		_id: "the_crafter_lbt", areaType: 2, productionTime: 1080, endProduct: "5e9db13186f7742f845ee9d3", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "5d5d85c586f774279a21cbdb", count: 2, type: "Item"},
		{templateId: "59e7643b86f7742cbf2c109a", count: 1, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}
	
	const mppv = {
		_id: "the_crafter_mppv",  areaType: 2, productionTime: 780, endProduct: "5df8a42886f77412640e2e75", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "5ca20abf86f77418567a43f2", count: 2, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	tables.hideout.production.push(camel, ana, ranch, glass, beltab, azimut, lbt, mppv)}

	//Medical Equipments
	if (config.CraftMedicalEquipments == true) {
	const ophthalmoscope = {
		_id: "the_crafter_ophthalmoscope", areaType: 7, productionTime: 900, endProduct: "5af0534a86f7743b6f354284", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "5e2aedd986f7746d404f3aa4", count: 1, type: "Item"},
		{templateId: "619cc01e0a7c3a1a2731940c", count: 2, type: "Item"},
		{templateId: "57d17c5e2459775a5c57d17d", count: 1, type: "Item"},
		{templateId: "5b4391a586f7745321235ab2", count: 1, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 1, type: "Item"},
		{areaType: 7, requiredLevel: 3, type: "Area"}]}

	const ibu = {
		_id: "the_crafter_ibu", areaType: 7, productionTime: 360, endProduct: "5af0548586f7743a532b7e99", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb37f4bdc2dee738b4567", count: 7, type: "Item"},
		{templateId: "590c695186f7741e566b64a2", count: 1, type: "Item"},
		{templateId: "5d1b3a5d86f774252167ba22", count: 1, type: "Item"},
		{areaType: 7, requiredLevel: 2, type: "Area"}]}

	const golden = {
		_id: "the_crafter_golden", areaType: 7, productionTime: 2520, endProduct: "5751a89d24597722aa0e8db0", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "5d1b3a5d86f774252167ba22", count: 2, type: "Item"},
		{templateId: "5755383e24597772cb798966", count: 2, type: "Item"},
		{templateId: "5d4041f086f7743cac3f22a7", count: 1, type: "Item"},
		{areaType: 7, requiredLevel: 3, type: "Area"}]}

	const car = {
		_id: "the_crafter_car", areaType: 7, productionTime: 180, endProduct: "590c661e86f7741e566b646a", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "5755356824597772cb798962", count: 2, type: "Item"},
		{templateId: "5751a25924597722c463c472", count: 1, type: "Item"},
		{templateId: "5d1b3a5d86f774252167ba22", count: 1, type: "Item"},
		{areaType: 7, requiredLevel: 1, type: "Area"}]}

	tables.hideout.production.push(ophthalmoscope, ibu, golden, car)}

	//Provisions
	if (config.CraftProvisions == true) {
	const vitamins = {
		_id: "the_crafter_vitamins", areaType: 8, productionTime: 720, endProduct: "62a0a043cf4a99369e2624a5", count: 3, productionLimitCount: 0,
		requirements: [
		{templateId: "590de71386f774347051a052", type: "Tool"},
		{templateId: "5d1b385e86f774252167b98a", type: "Tool"},
		{templateId: "57513f9324597720a7128161", count: 1, type: "Item"},
		{templateId: "57513fcc24597720a31c09a6", count: 1, type: "Item"},
		{templateId: "57513f07245977207e26a311", count: 1, type: "Item"},
		{templateId: "575062b524597720a31c09a1", count: 1, type: "Item"},
		{templateId: "544fb62a4bdc2dfb738b4568", count: 1, type: "Item"},
		{templateId: "544fb37f4bdc2dee738b4567", count: 1, type: "Item"},
		{areaType: 8, requiredLevel: 1, type: "Area"}]}

	const MRE = {
		_id: "the_crafter_MRE", areaType: 8, productionTime: 288, endProduct: "590c5f0d86f77413997acfab", count: 2, productionLimitCount: 0,
		requirements: [
		{templateId: "57347d3d245977448f7b7f61", count: 2, type: "Item"},
		{templateId: "57347d692459774491567cf1", count: 1, type: "Item"},
		{templateId: "57347d9c245977448b40fa85", count: 1, type: "Item"},
		{areaType: 8, requiredLevel: 1, type: "Area"}]}

	tables.hideout.production.push(vitamins, MRE)}

	//Secure containers
	if (config.CraftSecureContainers == true) {
	const alpha = {
		_id: "the_crafter_alpha", areaType: 11, productionTime: 2160, endProduct: "544a11ac4bdc2d470e8b456a", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "57347c5b245977448d35f6e1", count: 1, type: "Item"},
		{templateId: "57347c77245977448d35f6e2", count: 1, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 1, type: "Item"},
		{templateId: "590a3b0486f7743954552bdb", count: 1, type: "Item"},
		{templateId: "5c06779c86f77426e00dd782", count: 1, type: "Item"},
		{areaType: 11, requiredLevel: 1, type: "Area"}]}

	const beta = {	
		_id: "the_crafter_beta", areaType: 11, productionTime: 4320, endProduct: "5857a8b324597729ab0a0e7d", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40425986f7743185265461", type: "Tool"},
		{templateId: "590c2b4386f77425357b6123", type: "Tool"},
		{templateId: "544a11ac4bdc2d470e8b456a", count: 1, type: "Item"},
		{templateId: "57347c5b245977448d35f6e1", count: 8, type: "Item"},
		{templateId: "57347c77245977448d35f6e2", count: 8, type: "Item"},
		{templateId: "59e35ef086f7741777737012", count: 4, type: "Item"},
		{templateId: "5d1b39a386f774252339976f", count: 4, type: "Item"},
		{templateId: "5734795124597738002c6176", count: 2, type: "Item"},
		{areaType: 11, requiredLevel: 1, type: "Area"}]}

	const epsilon = {
		_id: "the_crafter_epsilon", areaType: 11, productionTime: 8640, endProduct: "59db794186f77448bc595262", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2c9c86f774245b1f03f2", type: "Tool"},
		{templateId: "5af04b6486f774195a3ebb49", type: "Tool"},
		{templateId: "5857a8b324597729ab0a0e7d", count: 1, type: "Item"},
		{templateId: "5e2af22086f7746d3f3c33fa", count: 4, type: "Item"},
		{templateId: "5d1b39a386f774252339976f", count: 8, type: "Item"},
		{templateId: "59e35cbb86f7741778269d83", count: 4, type: "Item"},
		{templateId: "5d1c774f86f7746d6620f8db", count: 2, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 2, type: "Item"},
		{areaType: 11, requiredLevel: 2, type: "Area"}]}

	const gamma = {
		_id: "the_crafter_gamma", areaType: 11, productionTime: 17280, endProduct: "5857a8bc2459772bad15db29", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "5d4042a986f7743185265463", type: "Tool"},
		{templateId: "5d40419286f774318526545f", type: "Tool"},
		{templateId: "59db794186f77448bc595262", count: 1, type: "Item"},
		{templateId: "61bf7b6302b3924be92fa8c3", count: 2, type: "Item"},
		{templateId: "59e366c186f7741778269d85", count: 2, type: "Item"},
		{templateId: "5d1c774f86f7746d6620f8db", count: 4, type: "Item"},
		{templateId: "5d1b39a386f774252339976f", count: 8, type: "Item"},
		{areaType: 11, requiredLevel: 2, type: "Area"}]}

	const kappa = {
		_id: "the_crafter_kappa", areaType: 11, productionTime: 92160, endProduct: "5c093ca986f7740a1867ab12", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "619cbfeb6b8a1b37a54eebfa", type: "Tool"},
		{templateId: "59e35de086f7741778269d84", type: "Tool"},
		{templateId: "5857a8bc2459772bad15db29", count: 1, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 4, type: "Item"},
		{templateId: "5d0376a486f7747d8050965c", count: 4, type: "Item"},
		{templateId: "619cbf476b8a1b37a54eebf8", count: 2, type: "Item"},
		{templateId: "5d0375ff86f774186372f685", count: 4, type: "Item"},
		{templateId: "5d03784a86f774203e7e0c4d", count: 1, type: "Item"},
		{areaType: 11, requiredLevel: 3, type: "Area"}]}

	tables.hideout.production.push(alpha, beta, epsilon, gamma, kappa)}

	//Tactical Devices
	if (config.CraftTacticalDevices == true) {
	const raptar = {
		_id: "the_crafter_raptar", areaType: 11, productionTime: 1440, endProduct: "61605d88ffa6e502ac5e7eeb", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c639286f774151567fa95", type: "Tool"},
		{templateId: "61605e13ffa6e502ac5e7eef", count: 1, type: "Item"},
		{templateId: "5cc9c20cd7f00c001336c65d", count: 1, type: "Item"},
		{templateId: "5672cb124bdc2d1a0f8b4568", count: 1, type: "Item"},
		{areaType: 11, requiredLevel: 1, type: "Area"}]}

	const klesch = {
		_id: "the_crafter_klesch", areaType: 2, productionTime: 60, endProduct: "5b3a337e5acfc4704b4a19a0", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2b4386f77425357b6123", type: "Tool"},
		{templateId: "5d1b392c86f77425243e98fe", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 1, type: "Area"}]}

	const steiner = {
		_id: "the_crafter_steiner", areaType: 2, productionTime: 120, endProduct: "5b07dd285acfc4001754240d", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c639286f774151567fa95", type: "Tool"},
		{templateId: "590a3cd386f77436f20848cb", count: 1, type: "Item"},
		{templateId: "5cc9c20cd7f00c001336c65d", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	const la5b = {
		_id: "the_crafter_la5b", areaType: 2, productionTime: 210, endProduct: "5c06595c0db834001a66af6c", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c639286f774151567fa95", type: "Tool"},
		{templateId: "590a3d9c86f774385926e510", count: 1, type: "Item"},
		{templateId: "5cc9c20cd7f00c001336c65d", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	tables.hideout.production.push(raptar, klesch, steiner, la5b)}

	//Weapons
	if (config.CraftWeapons == true) {
		const pkm = {
			_id: "the_crafter_pkm", areaType: 10, productionTime: 7200, endProduct: "64637076203536ad5600c990", count: 1, productionLimitCount: 0,
			requirements: [
			{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
			{templateId: "59e35de086f7741778269d84", type: "Tool"},
			{templateId: "59d6088586f774275f37482f", count: 1, type: "Item"},
			{templateId: "646372518610c40fc20204e8", count: 1, type: "Item"},
			{templateId: "5d1c819a86f774771b0acd6c", count: 1, type: "Item"},
			{templateId: "61bf7b6302b3924be92fa8c3", count: 1, type: "Item"},
			{areaType: 10, requiredLevel: 2, type: "Area"}]}
	
		const pkp = {
			_id: "the_crafter_pkp", areaType: 10, productionTime: 7200, endProduct: "64ca3d3954fc657e230529cc", count: 1, productionLimitCount: 0,
			requirements:  [
			{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
			{templateId: "59e35de086f7741778269d84", type: "Tool"},
			{templateId: "5ac66d2e5acfc43b321d4b53", count: 1, type: "Item"},
			{templateId: "646372518610c40fc20204e8", count: 1, type: "Item"},
			{templateId: "5d1c819a86f774771b0acd6c", count: 1, type: "Item"},
			{templateId: "61bf7b6302b3924be92fa8c3", count: 1, type: "Item"},
			{areaType: 10, requiredLevel: 2, type: "Area"}]}
	
		const rpdn = {
			_id: "the_crafter_rpdn", areaType: 10, productionTime: 7200, endProduct: "65268d8ecb944ff1e90ea385", count: 1, productionLimitCount: 0,
			requirements:  [
			{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
			{templateId: "59e35de086f7741778269d84", type: "Tool"},
			{templateId: "59d6088586f774275f37482f", count: 1, type: "Item"},
			{templateId: "6513f0a194c72326990a3868", count: 1, type: "Item"},
			{templateId: "5d1c819a86f774771b0acd6c", count: 1, type: "Item"},
			{templateId: "61bf7b6302b3924be92fa8c3", count: 2, type: "Item"},
			{areaType: 10, requiredLevel: 2, type: "Area"}]}
	
		tables.hideout.production.push(pkm, pkp, rpdn)}

	//Injectors
	if (config.CraftInjectors == true) {
	const adrenaline = {
		_id: "the_crafter_adrenaline", areaType: 7, productionTime: 480, endProduct: "5c10c8fd86f7743d7d706df3", count: 2, productionLimitCount: 0,
		requirements: [
		{templateId: "5755356824597772cb798962", count: 2, type: "Item"},
		{templateId: "5751435d24597720a27126d1", count: 2, type: "Item"},
		{templateId: "5751496424597720a27126da", count: 2, type: "Item"},
		{areaType: 7, requiredLevel: 2, type: "Area"}]}

	const ahf1 = {
		_id: "the_crafter_ahf1m", areaType: 7, productionTime: 540, endProduct: "5ed515f6915ec335206e4152", count: 2, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb3f34bdc2d03748b456a", count: 1, type: "Item"},
		{templateId: "590c695186f7741e566b64a2", count: 1, type: "Item"},
		{areaType: 7, requiredLevel: 2, type: "Area"}]}

	const i3btg = {
		_id: "the_crafter_3btg", areaType: 7, productionTime: 720, endProduct: "5ed515c8d380ab312177c0fa", count: 3, productionLimitCount: 0,
		requirements:[
		{templateId: "5c10c8fd86f7743d7d706df3", count: 2, type: "Item"},
		{templateId: "59e361e886f774176c10a2a5", count: 2, type: "Item"},
		{templateId: "57505f6224597709a92585a9", count: 2, type: "Item"},
		{areaType: 7, requiredLevel: 3, type: "Area"}]}

	const l1 = {
		_id: "the_crafter_l1", areaType: 7, productionTime: 900, endProduct: "5ed515e03a40a50460332579",  count: 2, productionLimitCount: 0,
		requirements: [
		{templateId: "5c0e531d86f7747fa23f4d42", count: 1, type: "Item"},
		{templateId: "5c10c8fd86f7743d7d706df3", count: 1, type: "Item"},
		{areaType: 7, requiredLevel: 3, type: "Area"}]}

	const zagustin = {
		_id: "the_crafter_zagustin", areaType: 7, productionTime: 900, endProduct: "5c0e533786f7747fa23f4d47", count: 3, productionLimitCount: 0,
		requirements: [
		{templateId: "5c0e530286f7747fa1419862", count: 2, type: "Item"},
		{templateId: "5e8488fa988a8701445df1e4", count: 1, type: "Item"},
		{templateId: "5ed515f6915ec335206e4152", count: 1, type: "Item"},
		{areaType: 7, requiredLevel: 2, type: "Area"}]}

	const obdolbos = {
		_id: "the_crafter_Obdolbos1", areaType: 7, productionTime: 2160, endProduct: "5ed5166ad380ab312177c100", count: 8, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "5c0e531286f7747fa54205c2", count: 1, type: "Item"},
		{templateId: "5b43575a86f77424f443fe62", count: 1, type: "Item"},
		{templateId: "5e2af00086f7746d3f3c33f7", count: 1, type: "Item"},
		{templateId: "62a09f32621468534a797acb", count: 1, type: "Item"},
		{templateId: "5d40407c86f774318526545a", count: 1, type: "Item"},
		{templateId: "5d403f9186f7743cac3f229b", count: 1, type: "Item"},
		{templateId: "5d1b376e86f774252519444e", count: 1, type: "Item"},
		{areaType: 7, requiredLevel: 2, type: "Area"}]}

	const obdolbos2 = {
		_id: "the_crafter_Obdolbos2", areaType: 7, productionTime: 4320, endProduct: "637b60c3b7afa97bfc3d7001", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "5d1b2f3f86f774252167a52c", type: "Tool"},
		{templateId: "5d1b385e86f774252167b98a", count: 1, type: "Item"},
		{templateId: "5ed5166ad380ab312177c100", count: 4, type: "Item"},
		{areaType: 7, requiredLevel: 3, type: "Area"}]}

	const perfotoran = {
		_id: "the_crafter_perfotoran", areaType: 7, productionTime: 900, endProduct: "637b6251104668754b72f8f9", count: 3, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "5c0e533786f7747fa23f4d47", count: 1, type: "Item"},
		{templateId: "590c695186f7741e566b64a2", count: 3, type: "Item"},
		{areaType: 7, requiredLevel: 3, type: "Area"}]}

	const trimadol = {
		_id: "the_crafter_trimadol", areaType: 7, productionTime: 1440, endProduct: "637b620db7afa97bfc3d7009", count: 3, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "5af0548586f7743a532b7e99", count: 1, type: "Item"},
		{templateId: "5c10c8fd86f7743d7d706df3", count: 1, type: "Item"},
		{templateId: "5751496424597720a27126da", count: 2, type: "Item"},
		{areaType: 7, requiredLevel: 3, type: "Area"}]}

	const meldonin = {
		_id: "the_crafter_meldonin", areaType: 7, productionTime: 900, endProduct: "5ed5160a87bb8443d10680b5", count: 3, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2e1186f77425357b6124", type: "Tool"},
		{templateId: "5c10c8fd86f7743d7d706df3", count: 1, type: "Item"},
		{templateId: "5d40407c86f774318526545a", count: 1, type: "Item"},
		{areaType: 7, requiredLevel: 2, type: "Area"}]}

	tables.hideout.production.push(adrenaline, ahf1, i3btg, l1, zagustin, obdolbos, obdolbos2, perfotoran, trimadol, meldonin)}

	//Magazines
	if (config.CraftMagazines == true) {
	const steyr42 = {
		_id: "the_crafter_steyr42", areaType: 2, productionTime: 300, endProduct: "630e295c984633f1fb0e7c30", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2d8786f774245b1f03f3", type: "Tool"},
		{templateId: "62e7c98b550c8218d602cbb4", count: 2, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 1, type: "Area"}]}

	const sks75 = {
		_id: "the_crafter_sks75", areaType: 10, productionTime: 810, endProduct: "61695095d92c473c7702147a", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2e1186f77425357b6124", type: "Tool"},
		{templateId: "587df583245977373c4f1129", count: 4, type: "Item"},
		{templateId: "5734795124597738002c6176", count: 3, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const akm75 = {
		_id: "the_crafter_akm75", areaType: 2, productionTime: 810, endProduct: "5cbdc23eae9215001136a407", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2e1186f77425357b6124", type: "Tool"},
		{templateId: "59d625f086f774661516605d", count: 5, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 1, type: "Area"}]}

	const akmpro73 = {
		_id: "the_crafter_akmpro73", areaType: 10, productionTime: 900, endProduct: "5c6175362e221600133e3b94", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "5a0060fc86f7745793204432", count: 5, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const akmdrum50 = {
		_id: "the_crafter_akmdrum50", areaType: 10, productionTime: 900, endProduct: "5cfe8010d7ad1a59283b14c6", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "59d6272486f77466146386ff", count: 4, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 2, type: "Item"},
		{templateId: "59e35ef086f7741777737012", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const glock50 = {
		_id: "the_crafter_glock50", areaType: 2, productionTime: 900, endProduct: "5a718f958dc32e00094b97e7", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2d8786f774245b1f03f3", type: "Tool"},
		{templateId: "5fb651b52b1b027b1f50bcff", count: 8, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 2, type: "Item"},
		{areaType: 2, requiredLevel: 1, type: "Area"}]}

	const saiga20 = {
		_id: "the_crafter_saiga20", areaType: 10, productionTime: 850, endProduct: "5cf8f3b0d7f00c00217872ef", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2e1186f77425357b6124", type: "Tool"},
		{templateId: "57616a9e2459773c7a400234", count: 5, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 2, type: "Item"},
		{templateId: "59e35ef086f7741777737012", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const mag60 = {
		_id: "the_crafter_mag60", areaType: 10, productionTime: 720, endProduct: "59c1383d86f774290a37e0ca", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "5aaa5dfee5b5b000140293d3", count: 4, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 1, type: "Item"},
		{templateId: "590c31c586f774245e3141b2", count: 2, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const stanag60 = {
		_id: "the_crafter_stanag60", areaType: 10, productionTime: 720, endProduct: "544a37c44bdc2d25388b4567", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "55d4887d4bdc2d962f8b4570", count: 4, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 1, type: "Item"},
		{templateId: "5e2af22086f7746d3f3c33fa", count: 2, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const rpk95 = {
		_id: "the_crafter_rpk95", areaType: 2, productionTime: 900, endProduct: "5bed625c0db834001c062946", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2e1186f77425357b6124", type: "Tool"},
		{templateId: "5bed61680db834001d2c45ab", count: 5, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 1, type: "Item"},
		{templateId: "5734795124597738002c6176", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 2, type: "Area"}]}

	const mp550 = {
		_id: "the_crafter_mp550", areaType: 2, productionTime: 810, endProduct: "5a351711c4a282000b1521a4", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2d8786f774245b1f03f3", type: "Tool"},
		{templateId: "5926c3b286f774640d189b6b", count: 5, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 2, type: "Item"},
		{areaType: 2, requiredLevel: 1, type: "Area"}]}

	const sr3m30 = {
		_id: "the_crafter_sr3m30", areaType: 10, productionTime: 480, endProduct: "5a9e81fba2750c00164f6b11", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "57838f9f2459774a150289a0", count: 3, type: "Item"},
		{templateId: "5734795124597738002c6176", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	const m1450 = {
		_id: "the_crafter_m1450", areaType: 10, productionTime: 760, endProduct: "5addccf45acfc400185c2989", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "5aaf8a0be5b5b00015693243", count: 2, type: "Item"},
		{templateId: "5addcce35acfc4001a5fc635", count: 1, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 2, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const stanag100 = {
		_id: "the_crafter_stanag100", areaType: 10, productionTime: 1080, endProduct: "5c6592372e221600133e47d7", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "544a37c44bdc2d25388b4567", count: 2, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 2, type: "Item"},
		{templateId: "5734795124597738002c6176", count: 2, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	const mpx41 = {
		_id: "the_crafter_mpx41", areaType: 2, productionTime: 360, endProduct: "5c5db6652e221600113fba51", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "590c2e1186f77425357b6124", type: "Tool"},
		{templateId: "5894a05586f774094708ef75", count: 3, type: "Item"},
		{templateId: "5734795124597738002c6176", count: 1, type: "Item"},
		{areaType: 2, requiredLevel: 1, type: "Area"}]}

	const mpx50 = {
		_id: "the_crafter_mpx50", areaType: 10, productionTime: 600, endProduct: "5c5db6742e2216000f1b2852", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a0bb621468534a797ad5", type: "Tool"},
		{templateId: "5c5db6652e221600113fba51", count: 2, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 2, type: "Item"},
		{areaType: 10, requiredLevel: 2, type: "Area"}]}

	tables.hideout.production.push(steyr42, sks75, akm75, akmpro73, akmdrum50, glock50, saiga20, mag60, stanag60, rpk95, mp550, sr3m30, m1450, stanag100, mpx41, mpx50)}

	//Impact grenade
	if (config.CraftGrenade == true) {
	const RGN = {
		_id: "the_crafter_rgn", areaType: 10, productionTime: 2880, endProduct: "617fd91e5539a84ec44ce155", count: 8, productionLimitCount: 0,
		requirements: [
		{templateId: "5e2af51086f7746d3f3c3402", count: 3, type: "Item"},
		{templateId: "60391a8b3364dc22b04d0ce5", count: 1, type: "Item"},
		{areaType: 10, requiredLevel: 3, type: "Area"}]}

	tables.hideout.production.push(RGN)}

	//Containers
	if (config.CraftContainers == true) {
	const ItemCase = {
		_id: "the_crafter_itemcase", areaType: 11, productionTime: 3600, endProduct: "59fb042886f7746c5005a7b2", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40419286f774318526545f", type: "Tool"},
		{templateId: "5b7c710788a4506dec015957", count: 1, type: "Item"},
		{templateId: "5d1b36a186f7742523398433", count: 1, type: "Item"},
		{templateId: "57347c77245977448d35f6e2", count: 4, type: "Item"},
		{templateId: "57347c5b245977448d35f6e1", count: 4, type: "Item"},
		{templateId: "61bf7b6302b3924be92fa8c3", count: 2, type: "Item"},
		{areaType: 11, requiredLevel: 1, type: "Area"}]}

	const MedCase = {
		_id: "the_crafter_medcase", areaType: 11, productionTime: 2880, endProduct: "5aafbcd986f7745e590fff23", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40419286f774318526545f", type: "Tool"},
		{templateId: "567143bf4bdc2d1a0f8b4567", count: 1, type: "Item"},
		{templateId: "544fb37f4bdc2dee738b4567", count: 2, type: "Item"},
		{templateId: "5755383e24597772cb798966", count: 1, type: "Item"},
		{templateId: "544fb3364bdc2d34748b456a", count: 4, type: "Item"},
		{templateId: "544fb25a4bdc2dfb738b4567", count: 4, type: "Item"},
		{templateId: "5e831507ea0a7c419c2f9bd9", count: 4, type: "Item"},
		{templateId: "544fb45d4bdc2dee738b4568", count: 1, type: "Item"},
		{areaType: 11, requiredLevel: 1, type: "Area"}]}

	const MoneyCase = {
		_id: "the_crafter_moneycase", areaType: 11, productionTime: 46080, endProduct: "59fb016586f7746d0d4b423a", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "59db794186f77448bc595262", count: 1, type: "Item"},
		{templateId: "5c94bbff86f7747ee735c08f", count: 2, type: "Item"},
		{templateId: "5448ba0b4bdc2d02308b456c", count: 2, type: "Item"},
		{areaType: 11, requiredLevel: 3, type: "Area"}]}

	const InjectorCase = {
		_id: "the_crafter_injectorcase", areaType: 11, productionTime: 4320, endProduct: "619cbf7d23893217ec30b689", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "5c093e3486f77430cb02e593", count: 1, type: "Item"},
		{templateId: "544fb3f34bdc2d03748b456a", count: 3, type: "Item"},
		{areaType: 11, requiredLevel: 2, type: "Area"}]}

	const KeycardsCase = {
		_id: "the_crafter_keycardscase", areaType: 11, productionTime: 4680, endProduct: "619cbf9e0a7c3a1a2731940a", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "60b0f6c058e0b0481a09ad11", count: 1, type: "Item"},
		{templateId: "5c94bbff86f7747ee735c08f", count: 2, type: "Item"},
		{templateId: "5783c43d2459774bbe137486", count: 2, type: "Item"},
		{areaType: 11, requiredLevel: 2, type: "Area"}]}

	const FoodCase = {
		_id: "the_crafter_foodcase", areaType: 11, productionTime: 2160, endProduct: "5c093db286f7740a1b2617e3", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "5d40419286f774318526545f", type: "Tool"},
		{templateId: "5e2af41e86f774755a234b67", count: 4, type: "Item"},
		{templateId: "5e2af4a786f7746d3f3c3400", count: 4, type: "Item"},
		{templateId: "5d1b32c186f774252167a530", count: 1, type: "Item"},
		{templateId: "5d1b327086f7742525194449", count: 1, type: "Item"},
		{areaType: 11, requiredLevel: 1, type: "Area"}]}

	const WepCase = {
		_id: "the_crafter_wepcase", areaType: 11, productionTime: 3600, endProduct: "59fb023c86f7746d0d4b423c", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "59fb042886f7746c5005a7b2", count: 1, type: "Item"},
		{templateId: "5910968f86f77425cf569c32", count: 1, type: "Item"},
		{areaType: 11, requiredLevel: 2, type: "Area"}]}

	const SICCCase = {
		_id: "the_crafter_sicccase", areaType: 11, productionTime: 8640, endProduct: "5d235bb686f77443f4331278", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
		{templateId: "590c60fc86f77412b13fddcf", count: 1, type: "Item"},
		{templateId: "590c651286f7741e566b6461", count: 4, type: "Item"},
		{templateId: "590c645c86f77412b01304d9", count: 4, type: "Item"},
		{areaType: 11, requiredLevel: 2, type: "Area"}]}

	tables.hideout.production.push(ItemCase, MedCase, MoneyCase, InjectorCase, KeycardsCase, FoodCase, WepCase, SICCCase)}
	
	//Repair Kits
	if (config.CraftKits == true) {
	
	const BodyKit = {
		_id: "the_crafter_bodykit", areaType: 11, productionTime: 7200, endProduct: "591094e086f7747caa7bb2ef", count: 1, productionLimitCount: 0,
		requirements: [
		{templateId: "62a0a098de7ac8199358053b", type: "Tool"},
		{templateId: "61bf83814088ec1a363d7097", type: "Tool"},
		{templateId: "5e2af41e86f774755a234b67", count: 2, type: "Item"},
		{templateId: "5e2af29386f7746d4159f077", count: 2, type: "Item"},
		{templateId: "57347c1124597737fb1379e3", count: 3, type: "Item"},
		{templateId: "656f603f94b480b8a500c0d6", count: 1, type: "Item"},
		{templateId: "656f664200d62bcd2e024077", count: 1, type: "Item"},
		{areaType: 11, requiredLevel: 2, type: "Area"}]}

	tables.hideout.production.push(BodyKit)}
	//Armor vests
	if (config.CraftArmors == true) {
	
		const Kirasa = {
			_id: "the_crafter_Kirasa", areaType: 2, productionTime: 720, endProduct: "5b44d22286f774172b0c9de8", count: 1, productionLimitCount: 0,
			requirements: [
			{templateId: "5e2af4d286f7746d4159f07a", count: 1, type: "Item"},
			{templateId: "5e2af4a786f7746d3f3c3400", count: 1, type: "Item"},
			{templateId: "656f9d5900d62bcd2e02407c", count: 1, type: "Item"},
			{areaType: 2, requiredLevel: 1, type: "Area"}]}
	
			const A6b13 = {
			_id: "the_crafter_A6b13", areaType: 2, productionTime: 1000, endProduct: "5c0e51be86f774598e797894", count: 1, productionLimitCount: 0,
			requirements: [
			{templateId: "5d40419286f774318526545f", type: "Tool"},
			{templateId: "5e2af4d286f7746d4159f07a", count: 1, type: "Item"},
			{templateId: "5e2af4a786f7746d3f3c3400", count: 1, type: "Item"},
			{templateId: "5e2af41e86f774755a234b67", count: 1, type: "Item"},
			{templateId: "656f603f94b480b8a500c0d6", count: 1, type: "Item"},
			{areaType: 2, requiredLevel: 2, type: "Area"}]}
	
			const Trooper = {
			_id: "the_crafter_Trooper", areaType: 2, productionTime: 1260, endProduct: "5c0e655586f774045612eeb2", count: 1, productionLimitCount: 0,
			requirements: [
			{templateId: "5d40419286f774318526545f", type: "Tool"},
			{templateId: "5e2af4d286f7746d4159f07a", count: 3, type: "Item"},
			{templateId: "656fad8c498d1b7e3e071da0", count: 1, type: "Item"},
			{areaType: 2, requiredLevel: 2, type: "Area"}]}
	
			const Gzhel = {
			_id: "the_crafter_Gzhel", areaType: 2, productionTime: 1520, endProduct: "5ab8e79e86f7742d8b372e78", count: 1, productionLimitCount: 0,
			requirements: [
			{templateId: "63a0b208f444d32d6f03ea1e", type: "Tool"},
			{templateId: "5e2af4d286f7746d4159f07a", count: 3, type: "Item"},
			{templateId: "656f611f94b480b8a500c0db", count: 1, type: "Item"},
			{areaType: 2, requiredLevel: 3, type: "Area"}]}
	
			const Korund = {
			_id: "the_crafter_Gzhel", areaType: 2, productionTime: 1530, endProduct: "5f5f41476bdad616ad46d631", count: 1, productionLimitCount: 0,
			requirements: [
			{templateId: "63a0b208f444d32d6f03ea1e", type: "Tool"},
			{templateId: "5e2af4d286f7746d4159f07a", count: 3, type: "Item"},
			{templateId: "656f664200d62bcd2e024077", count: 1, type: "Item"},
			{templateId: "654a4f8bc721968a4404ef18", count: 1, type: "Item"},
			{areaType: 2, requiredLevel: 3, type: "Area"}]}
	
			const Zhuk = {
			_id: "the_crafter_Gzhel", areaType: 2, productionTime: 2000, endProduct: "5c0e625a86f7742d77340f62", count: 1, productionLimitCount: 0,
			requirements: [
			{templateId: "63a0b208f444d32d6f03ea1e", type: "Tool"},
			{templateId: "5e2af4d286f7746d4159f07a", count: 3, type: "Item"},
			{templateId: "656f63c027aed95beb08f62c", count: 1, type: "Item"},
			{templateId: "64afd81707e2cf40e903a316", count: 1, type: "Item"},
			{areaType: 2, requiredLevel: 3, type: "Area"}]}
	
		tables.hideout.production.push(Kirasa, A6b13, Trooper, Gzhel, Korund, Zhuk)}
	
		//Headsets
		if (config.CraftHeadsets == true) {
		
		const Sport = {
			_id: "the_crafter_Sport", areaType: 2, productionTime: 1250, endProduct: "5c165d832e2216398b5a7e36", count: 1, productionLimitCount: 0,
			requirements: [
			{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
			{templateId: "590c2e1186f77425357b6124", type: "Tool"},
			{templateId: "6033fa48ffd42c541047f728", count: 1, type: "Item"},
			{templateId: "5c06782b86f77426df5407d2", count: 2, type: "Item"},
			{templateId: "6389c70ca33d8c4cdf4932c6", count: 1, type: "Item"},
			{templateId: "5672cb124bdc2d1a0f8b4568", count: 3, type: "Item"},
			{areaType: 2, requiredLevel: 2, type: "Area"}]}
	
			const Comtac4 = {
			_id: "the_crafter_Comtac4", areaType: 2, productionTime: 1840, endProduct: "628e4e576d783146b124c64d", count: 1, productionLimitCount: 0,
			requirements: [
			{templateId: "544fb5454bdc2df8738b456a", type: "Tool"},
			{templateId: "590c2e1186f77425357b6124", type: "Tool"},
			{templateId: "5645bcc04bdc2d363b8b4572", count: 1, type: "Item"},
			{templateId: "5e2af29386f7746d4159f077", count: 2, type: "Item"},
			{templateId: "590a391c86f774385a33c404", count: 2, type: "Item"},
			{templateId: "5e2aedd986f7746d404f3aa4", count: 1, type: "Item"},
			{areaType: 2, requiredLevel: 3, type: "Area"}]}
	
		tables.hideout.production.push(Sport, Comtac4)}
}

module.exports = { mod: new the_crafter() }