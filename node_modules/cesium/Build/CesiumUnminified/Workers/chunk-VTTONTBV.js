/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.146.0
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import {
  TerrainProvider_default
} from "./chunk-OYTDOQJQ.js";
import {
  TerrainEncoding_default
} from "./chunk-C4BI3UED.js";
import {
  Resource_default,
  buildModuleUrl_default,
  isCrossOriginUrl_default
} from "./chunk-4GX4QAU2.js";
import {
  AttributeCompression_default,
  AxisAlignedBoundingBox_default,
  BoundingSphere_default,
  Cartesian2_default,
  Cartesian3_default,
  Cartographic_default,
  Check_default,
  ComponentDatatype_default,
  DeveloperError_default,
  Ellipsoid_default,
  EllipsoidalOccluder_default,
  Event_default,
  FixedFrameTransforms_default,
  Frozen_default,
  IntersectionTests_default,
  Interval_default,
  Math_default,
  Matrix3_default,
  Matrix4_default,
  OrientedBoundingBox_default,
  Ray_default,
  Rectangle_default,
  RuntimeError_default,
  VerticalExaggeration_default,
  WebMercatorProjection_default,
  __toESM,
  binarySearch_default,
  defined_default,
  destroyObject_default,
  require_URI
} from "./chunk-N4AX4H36.js";

// node_modules/meshoptimizer/meshopt_encoder.js
var MeshoptEncoder = (function() {
  var wasm = "b9H79Tebbbe9ok9Geueu9Geub9Gbb9Gruuuuuuueu9Gvuuuuueu9Gduueu9Gluuuueu9Gvuuuuub9Gouuuuuub9Gluuuub9GiuuueuiE8AdilveoveovrrwrrrDDoDrbqqbelve9Weiiviebeoweuecj:Gdkr:PlCo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9mW4W2be8A9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWVbd8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9c9V919U9KbiE9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949wWV79P9V9UblY9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWVbv8E9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWV9c9V919U9Kbo8A9TW79O9V9Wt9FW9U9J9V9KW69U9KW949wWV79P9V9UbrE9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JWbwa9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JW9c9V919U9KbDL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9p9JtbqK9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9r919HtbkL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWVT949WbxY9TW79O9V9Wt9FW9U9J9V9KWS9P2tWVJ9V29VVbmE9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OWbza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OW9ttV9P9WbHa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbOK9TW79O9V9Wt9F79W9Ht9P9H29t9VVt9sW9T9H9WbAl79IV9RbXDwebcekdKYq:Nf8Adbk;wadhud9:8Jjjjjbc;qw9Rgr8KjjjjbcbhwdnaeTmbabcbyd;i:I:cjbaoaocb9iEgDc:GeV86bbarc;adfcbcjdz:xjjjb8AdnaiTmbarc;adfadalz:wjjjb8Akarc;abfalfcbcbcjdal9RalcFe0Ez:xjjjb8Aarc;abfarc;adfalz:wjjjb8Aar9cb83iUar9cb83i8War9cb83iyar9cb83iaar9cb83iKar9cb83izar9cb83iwar9cb83ibcj;abal9Uc;WFbGcjdalca0Ehqdnaicd6mbavcd9imbaDTmbadcefhkaqci2gxal2hmarc;alfclfhParc;qlfceVhsarc;qofclVhzcbhHincdhOcbhAdnavci6mbar9cb83i;Ooar9cb83i;Goar9cb83i;yoar9cb83i;qoadaHfgoybbhCcbhXincbhwcbhQdninaoalfhLaoybbgKaC7aQVhQawcP0meaLhoaKhCawcefgwaXfai6mbkkcbhCarc;qofhwincwhYcwh8AdnaQaC93gocFeGgEcs0mbclh8AaEci0mbcdcbaEEh8Akdnaocw4cFeGgEcs0mbclhYaEci0mbcdcbaEEhYkaYa8AfhEawydbh3cwhYcwh8Adnaocz4cFeGg5cs0mbclh8Aa5ci0mbcdcba5Eh8AkaEa3fhEdnaocFFFFb0mbclhYaocFFF8F0mbcbcdaocjjjw6EhYkawaEa8AfaYfBdbawclfhwaCcefgCcw9hmbkaLhoaKhCaXczfgXai6mbkcbhocehwazhQinawaoaQydbarc;qofaocdtfydb6EhoaQclfhQawcefgwcw9hmbkaoclthAcihOkcbhEarc;qlfcbcjdz:xjjjb8AarcbBd;ilar9cb83i;aladh8Eaqh8Fakh3inarc;qlfadaEaEcb9h9Ral2falz:wjjjb8Aaia8Faia8F6EhadnaqaiaE9RaEaqfai6EgKcsfc9WGgoaK9nmbarc;qofaKfcbaoaK9Rz:xjjjb8AkadaEal2fhhcbhginagaAVcl4hXarc;alfagcdtfh8JaHh8Kcbh8Lina8LaHfhwdndndndndndndnagPlbedibkaKTmvahawfhoarc;qlfawfRbbhQarc;qofhwaahCinawaoRbbgYaQ9RgQcetaQcKtc8F91786bbawcefhwaoalfhoaYhQaEaCcufgC9hmbxvkkaKTmla8Kc9:Ghoa8LcitcwGh8Aarc;qlfawceVfRbbcwtarc;qlfawc9:GfRbbVhQarc;qofhwaahCinawa3aofRbbcwta8EaofRbbVgYaQ9RgQcetaQcztc8F917cFFiGa8A486bbaoalfhoawcefhwaYhQaEaCcufgC9hmbxlkkasa8Kc98GgQfhoa3aQfhYarc;qlfawc98GgQfRbbhCcwhwinaoRbbawtaCVhCaocefhoawcwfgwca9hmbxdkkaKTmdxekaKTmea8Lcith5ahaQfh8AcbhLina8ARbbhQcwhoaYhwinawRbbaotaQVhQawcefhwaocwfgoca9hmbkarc;qofaLfaQaC7aX93a5486bbaYalfhYa8Aalfh8AaQhCaLcefgLaK9hmbkka8Jydbh8AcbhLarc;qofhoincdhQcbhwinaQaoawfRbbcb9hfhQawcefgwcz9hmbkclhCcbhwinaCaoawfRbbcd0fhCawcefgwcz9hmbkcwhYcbhwinaYaoawfRbbcP0fhYawcefgwcz9hmbkaQaCaQaC6EgwaYawaY6Egwczawcz6Ea8Afh8AaoczfhoaLczfgLaK6mbka8Ja8ABdbka8Kcefh8Ka8Lcefg8Lcl9hmbkagcefggaO9hmbka8Eamfh8Ea8Faxfh8Fa3amfh3aEaxfgEai6mbkcbhocehwaPhQinawaoaQydbarc;alfaocdtfydb6EhoaQclfhQaOawcefgw9hmbkaraHcd4faAcdVaoaocdSE86bbaHclfgHal6mbkkabaefhgabcefhoalcd4g8McbaDEhkadcefh8Narc;abfceVhecbhmdndninaiam9nmearc;qofcbcjdz:xjjjb8Aagao9Rak6mdadamal2gwfhxcbhHa8Nawfhzaocbakz:xjjjbg8Fakfh3aqaiam9Ramaqfai6Egscsfgocl4cifcd4hOaoc9WGg8JThPindndndndndndndndndndnaDTmbaraHcd4fRbbgQciGPlbedlbkasTmdaxaHfhoarc;abfaHfRbbhQarc;qofhwashCinawaoRbbgYaQ9RgQcetaQcKtc8F91786bbawcefhwaoalfhoaYhQaCcufgCmbxikkasTmiaHcitcwGh8Aarc;abfaHceVfRbbcwtarc;abfaHc9:GgofRbbVhQaxaofhoarc;qofhwashCinawao8VbbgYaQ9RgQcetaQcztc8F917cFFiGa8A486bbawcefhwaoalfhoaYhQaCcufgCmbxikkaeaHc98Gg8Afhoaza8AfhYarc;abfa8AfRbbhCcwhwinaoRbbawtaCVhCaocefhoawcwfgwca9hmbkasTmdaQcl4hKaHcitcKGhEaxa8Afh8AcbhLina8ARbbhQcwhoaYhwinawRbbaotaQVhQawcefhwaocwfgoca9hmbkarc;qofaLfaQaC7aK93aE486bbaYalfhYa8Aalfh8AaQhCaLcefgLas9hmbkkaDmbcbhoxlka8JTmbcbhodninarc;qofaofgwcwf8Pibaw8Pib:e9qTmeaoczfgoa8J9pmdxbkkdnavmbcehoxikcbh8AaOhLaOhKinarc;qofa8Afgocwf8Pibhyao8Pibh8PcdhQcbhwinaQaoawfRbbcb9hfhQawcefgwcz9hmbkclhCcbhwinaCaoawfRbbcd0fhCawcefgwcz9hmbkcwhYcbhwinaYaoawfRbbcP0fhYawcefgwcz9hmbkaQaCaQaC6EgoaYaoaY6Egoczaocz6EaKfhKaocucbaya8P:e9cb9sEgwaoaw6EaLfhLa8Aczfg8Aa8J9pmdxbkka8FaHcd4fgoaoRbbcdaHcetcoGtV86bbxikdnaLas6mbaKas6mba8FaHcd4fgoaoRbbciaHcetcoGtV86bbaga39Ras6mra3arc;qofasz:wjjjbasfh3xikaLaK9phoka8FaHcd4fgwawRbbaoaHcetcoGtV86bbkaga39RaO6mla3cbaOz:xjjjbgaaOfhKdndna8JmbaPhoxekdnagaK9RcK9pmbaPhoxekaocdtc:q:G:cjbfcj:G:cjbaDEg3ydxghcetc;:FFFeGhAcuhEcuahtcu7cFeGh8Ecbh8Karc;qofhQinarc;qofa8KfhXczh8AdndndnahPDbeeeeeeedekcucbaXcwf8PibaX8Pib:e9cb9sEh8AxekcbhoaAh8Aina8Aa8EaQaofRbb9nfh8Aaocefgocz9hmbkkcih5cbhYinczhwdndndna3aYcdtfydbgLPDbeeeeeeedekcucbaXcwf8PibaX8Pib:e9cb9sEhwxekaLcetc;:FFFeGhwcuaLtcu7cFeGhCcbhoinawaCaQaofRbb9nfhwaocefgocz9hmbkkdndnawa8A6mbaLaE9hmeawa8A9hmea3a5cdtfydbcwSmekaYh5awh8AkaYcefgYci9hmbkaaa8Kco4fgoaoRbba5a8Kci4coGtV86bbdndndna3a5cdtfydbgEPDdbbbbbbbebkdncwaE9Tg5TmbcuaEtcu7hwdndnaEceSmbcbh8LaQhXinaXhoa5hYcbhCinaoRbbg8AawcFeGgLa8AaL6EaCaEtVhCaocefhoaYcufgYmbkaKaC86bbaXa5fhXaKcefhKa8La5fg8Lcz6mbxdkkcbh8LaQhXinaXhoa5hYcbhCinaoRbbg8AawcFeGgLa8AaL6EaCcetVhCaocefhoaYcufgYmbkaKaC:T9cFe:d9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:9ca188bbaXa5fhXaKcefhKa8La5fg8Lcz6mbkkcbhoinaKaQaofRbbgC86bbaKaCawcFeG9pfhKaocefgocz9hmbxikkdnaEceSmbinaKcb86bbaKcefhKxbkkinaKcb86bbaKcefhKxbkkaKaX8Pbw83bwaKaX8Pbb83bbaKczfhKka8Kczfg8Ka8J9pgomeaQczfhQagaK9RcK9pmbkkaoTmlaKh3aKTmlkaHcefgHal9hmbkarc;abfaxascufal2falz:wjjjb8Aasamfhma3hoa3mbkcbhwxdkdnagao9RakalfgwcKcaaDEgQawaQ0EgC9pmbcbhwxdkdnawaQ9pmbaocbaCaw9Rgwz:xjjjbawfhokaoarc;adfalz:wjjjbalfhodnaDTmbaoara8Mz:wjjjba8Mfhokaoab9Rhwxekcbhwkarc;qwf8Kjjjjbawk5babaeadaialcdcbyd;i:I:cjbz:bjjjbk9reduaecd4gdaefgicaaica0Ecj;abae9Uc;WFbGcjdaeca0Egicl4cifcd4aifae2adfabaifcufai9U2fcefkmbcbabBd;i:I:cjbk;HPeLu8Jjjjjbc;ae9Rgl8Kjjjjbcbhvdnaeaici9UgocHf6mbabcbyd;m:I:cjbgrc;GeV86bbalc;abfcFecjez:xjjjb8Aal9cu83iUal9cu83i8Wal9cu83iyal9cu83iaal9cu83iKal9cu83izal9cu83iwal9cu83ibabaefc9WfhwabcefgDaofhednaiTmbcmcsarcb9kgqEhkcbhxcbhmcbhPcbhscbhzindnaeaw9nmbcbhvxikazcufhvadaPcdtfgHydbhOaHcwfydbhAaHclfydbhCcbhXdndndninalc;abfavcsGcitfgoydlhQdndndnaoydbgoaO9hmbaQaCSmekdnaoaC9hmbaQaA9hmbaXcefhXxekaoaA9hmeaQaO9hmeaXcdfhXkaXc870mdascufhvaHaXcdtgAcxGgoyd:4:G:cjbcdtfydbhQaHaoyd:0:G:cjbcdtfydbhCaHaoyd:W:G:cjbcdtfydbhOcbhodnindnalavcsGcdtfydbaQ9hmbaohXxdkcuhXavcufhvaocefgocz9hmbkkaxaQaxSgvaXce9iaXak9oVgoGfhxdndndncbcsavEaXaoEgvcs9hmbarce9imbaQaQamaQcefamSgvEgmcefSmecmcsavEhvkaDavaAc;WeGV86bbavcs9hmeaQam9Rgvcetavc8F917hvinaecbcjeavcje6EavcFbGV86bbaecefheavcr4gvmbkaQhmxvkcPhvaDaAcPV86bbaQhmkavTmiavak9omicdhocehXazhAxlkavcufhvaXclfgXc;ab9hmbkkdnaHcecdcbaAaxSEaCaxSEcdtgvyd:W:G:cjbcdtfydbgOTaHavyd:0:G:cjbcdtfydbgCceSGaHavyd:4:G:cjbcdtfydbgQcdSGaxcb9hGaqGgLce9hmbal9cu83iUal9cu83i8Wal9cu83iyal9cu83iaal9cu83iKal9cu83izal9cu83iwal9cu83ibcbhxkcbhXascufgvhodnindnalaocsGcdtfydbaC9hmbaXhAxdkcuhAaocufhoaXcefgXcz9hmbkkcbhodnindnalavcsGcdtfydbaQ9hmbaohXxdkcuhXavcufhvaocefgocz9hmbkkaxaOaxSgKfhHdndnaAcm0mbaAcefhAxekcbcsaCaHSgvEhAaHavfhHkdndnaXcm0mbaXcefhXxekcbcsaQaHSgvEhXaHavfhHkc9:cuaKEhYcbhvaXaAcltVg8AcFeGhodndndninavc;q:G:cjbfRbbaoSmeavcefgvcz9hmbxdkkaLaOax9havcm0VVmbaDavc;WeV86bbxekaDaY86bbaea8A86bbaecefhekdnaKmbaOam9Rgvcetavc8F917hvinaecbcjeavcje6EavcFbGV86bbaecefheavcr4gvmbkaOhmkdnaAcs9hmbaCam9Rgvcetavc8F917hvinaecbcjeavcje6EavcFbGV86bbaecefheavcr4gvmbkaChmkdnaXcs9hmbaQam9Rgvcetavc8F917hvinaecbcjeavcje6EavcFbGV86bbaecefheavcr4gvmbkaQhmkalascdtfaOBdbascefcsGhvdndnaAPzbeeeeeeeeeeeeeebekalavcdtfaCBdbascdfcsGhvkdndnaXPzbeeeeeeeeeeeeeebekalavcdtfaQBdbavcefcsGhvkcihoalc;abfazcitfgXaOBdlaXaCBdbazcefcsGhAcdhXavhsaHhxxekcdhoalascdtfaQBdbcehXascefcsGhsazhAkalc;abfaAcitfgvaCBdlavaQBdbalc;abfazaXfcsGcitfgvaQBdlavaOBdbaDcefhDazaofcsGhzaPcifgPai6mbkkdnaeaw9nmbcbhvxekcbhvinaeavfavc;q:G:cjbfRbb86bbavcefgvcz9hmbkaeab9Ravfhvkalc;aef8KjjjjbavkZeeucbhddninadcefgdc8F0meaeceadt0mbkkadcrfcFeGcr9Uci2cdfabci9U2cHfkmbcbabBd;m:I:cjbk:zderu8Jjjjjbcz9Rhlcbhvdnaeaicvf6mbabcbRb;m:I:cjbc;qeV86bbal9cb83iwabcefhvabaefc98fhodnaiTmbcbhecbhrcbhwindnavao6mbcbskadawcdtfydbgDalcwfaraDae9Rgeaec8F91ge7ae9Rc507grcdtfgqydb9Rgec8E91c9:Gaecdt7arVheinavcbcjeaecje6EaecFbGV86bbavcefhvaecr4gembkaqaDBdbaDheawcefgwai9hmbkkdnavao9nmbcbskavcbBbbavab9RclfhvkavkBeeucbhddninadcefgdc8F0meaeceadt0mbkkabadcwfcFeGcr9U2cvfk:dvli99dui99ludnaeTmbcuadcetcuftcu7:Zhvdndncuaicuftcu7:ZgoJbbbZMgr:lJbbb9p9DTmbar:Ohwxekcjjjj94hwkcbhicbhDinalclfIdbgrJbbbbJbbjZalIdbgq:lar:lMalcwfIdbgk:lMgr:varJbbbb9BEgrNhxaqarNhralcxfIdbhqdndnakJbbbb9GTmbaxhkxekJbbjZar:l:tgkak:maxJbbbb9GEhkJbbjZax:l:tgxax:marJbbbb9GEhrkdndnaqJbbj:;aqJbbj:;9GEgxJbbjZaxJbbjZ9FEavNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohmxekcjjjj94hmkdndnakJbbj:;akJbbj:;9GEgqJbbjZaqJbbjZ9FEaoNJbbbZJbbb:;akJbbbb9GEMgq:lJbbb9p9DTmbaq:OhPxekcjjjj94hPkdndnarJbbj:;arJbbj:;9GEgqJbbjZaqJbbjZ9FEaoNJbbbZJbbb:;arJbbbb9GEMgr:lJbbb9p9DTmbar:Ohsxekcjjjj94hskdndnadcl9hmbabaDfgzas86bbazcifam86bbazcdfaw86bbazcefaP86bbxekabaifgzas87ebazcofam87ebazclfaw87ebazcdfaP87ebkaicwfhiaDclfhDalczfhlaecufgembkkk;hlld99eud99eudnaeTmbdndncuaicuftcu7:ZgvJbbbZMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikaic;8FiGhrinabcofcicdalclfIdb:lalIdb:l9EgialcwfIdb:lalaicdtfIdb:l9EEgialcxfIdb:lalaicdtfIdb:l9EEgiarV87ebdndnJbbj:;JbbjZalaicdtfIdbJbbbb9DEgoalaicd7cdtfIdbJ;Zl:1ZNNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabcdfaq87ebdndnalaicefciGcdtfIdbJ;Zl:1ZNaoNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabaq87ebdndnaoalaicufciGcdtfIdbJ;Zl:1ZNNgoJbbj:;aoJbbj:;9GEgwJbbjZawJbbjZ9FEavNJbbbZJbbb:;aoJbbbb9GEMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikabclfai87ebabcwfhbalczfhlaecufgembkkk;uvdDue998Jjjjjbcjd9Rgo8Kjjjjbdndndnadcd4grTmbc:CucbavEhwaohdarhDinadawBdbadclfhdaDcufgDmbkavcd9hmbaeTmbarcdthqcbhkalhxinaohdaxhDarhwinadadydbgmaDydbcL4cFeGc:cufgPamaP9kEBdbaDclfhDadclfhdawcufgwmbkaxaqfhxakcefgkae9hmbxdkkaeTmekarcdthxavce9hhqcbhkindndndnaqmbarTmdc:CuhwalhdarhDinawadydbcL4cFeGc:cufgmawam9kEhwadclfhdaDcufgDmbxdkkdndndndnavPleddbdkarTmlaohdalhDarhwinadcbaDydbcL4cFeGgmc:cufgPaPam0EBdbadclfhdaDclfhDawcufgwmbxikkarTmicbhdarhDindnaladfIdbgsJbbbb9Bmbaoadfas:8cL4cFeGgwc8Aawc8A0Ec:cufBdbkadclfhdaDcufgDmbxdkkarTmdkc:CuhwkcbhdarhminawhDdnavceSmbaoadfydbhDkdndnaladfIdbgscjjj;8iaDai9RcefgPcLt9R::NJbbbZJbbb:;asJbbbb9GEMgs:lJbbb9p9DTmbas:OhDxekcjjjj94hDkabadfaDcFFFiaDcFFFi9iEcFFFrGaPcKtVBdbadclfhdamcufgmmbkkabaxfhbalaxfhlakcefgkae9hmbkkaocjdf8Kjjjjbk:Olveue99iue99iudnaeTmbceaicufthvcuaitcu7:Zhocbhradcl9hhwcbhDindndnalcwfIdbgqJbbbbaqJbbbb9GEgqJbbjZaqJbbjZ9FEaoNJbbbZMgq:lJbbb9p9DTmbaq:Ohixekcjjjj94hikdndnalIdbgqJbbbbaqJbbbb9GEgqJbbjZaqJbbjZ9FEaoNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkadai9Rcd9TgkaifhidndnalclfIdbgqJbbbbaqJbbbb9GEgqJbbjZaqJbbjZ9FEaoNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkadai9Rcd9ThddndnalcxfIdbgqJbbbbaqJbbbb9GEgqJbbjZaqJbbjZ9FEaoNJbbbZMgq:lJbbb9p9DTmbaq:Ohxxekcjjjj94hxkadaifhiaxce91avVhxdndnawmbabaDfgmai86bbamcifax86bbamcdfad86bbamcefak86bbxekabarfgmai87ebamcofax87ebamclfad87ebamcdfak87ebkarcwfhraDclfhDalczfhlaecufgembkkk;mqdQui998Jjjjjbc:qd9Rgv8Kjjjjbavc:Sefcbc;Kbz:xjjjb8AdnadTmbaiTmbdndnabaeSmbaehoxekavcuadcdtgradcFFFFi0Ecbyd;q:I:cjbHjjjjbbgoBd:SeavceBd:mdaoaearz:wjjjb8AkavcbBd:Oeav9cb83i:Geavc:Gefaoadaiavc:Sefz:pjjjbavyd:Gehwadci9UgDcbyd;q:I:cjbHjjjjbbheavc:Sefavyd:mdgqcdtfaeBdbavaqcefgrBd:mdaecbaDz:xjjjbhkavc:SefarcdtfcuaicdtaicFFFFi0Ecbyd;q:I:cjbHjjjjbbgxBdbavaqcdfgmBd:mdalc;ebfhPawheaxhrinaralIdbaPaeydbgscwascw6EcdtfIdbMUdbaeclfhearclfhraicufgimbkavc:SefamcdtfcuaDcdtadcFFFF970Ecbyd;q:I:cjbHjjjjbbgmBdbdnadci6mbaoheamhraDhiinaraxaeydbcdtfIdbaxaeclfydbcdtfIdbMaxaecwfydbcdtfIdbMUdbaecxfhearclfhraicufgimbkkaqcifhzalc;ebfhHavc;qbfhOavheavyd:KehAavyd:OehCcbhscbhrcbhXcehQinaehLaoarcx2fgKydbhPaKclfydbhdabaXcx2fgecwfaKcwfydbgYBdbaeclfadBdbaeaPBdbakarfce86bbaOaYBdwaOadBdlaOaPBdbamarcdtfcbBdbcih8AdnasTmbaLhiinaOa8AcdtfaiydbgeBdba8AaeaY9haeaP9haead9hGGfh8AaiclfhiascufgsmbkkaXcefhXcbhsinaCaAaKascdtfydbcdtgifydbcdtfgYheawaifgdydbgPhidnaPTmbdninaeydbarSmeaeclfheaicufgiTmdxbkkaeaYaPcdtfc98fydbBdbadadydbcufBdbkascefgsci9hmbkdndndna8ATmbcuhrJbbbbhEcbhdavyd:KehYavyd:OehKindnawaOadcdtfydbcdtgsfydbgeTmbaxasfgiIdbh3aialcuadadcs0EcdtfclfIdbaHaecwaecw6EcdtfIdbMg5Udba5a3:th5aecdthiaKaYasfydbcdtfheinamaeydbgscdtfgPa5aPIdbMg3Udba3aEaEa39DgPEhEasaraPEhraeclfheaic98fgimbkkadcefgda8A9hmbkarcu9hmekaQaD9pmeindnakaQfRbbmbaQhrxdkaDaQcefgQ9hmbxdkka8Acza8Acz6EhsaOheaLhOarcu9hmekkazTmbaqcdtavc:Seffcwfheinaeydbcbyd;u:I:cjbH:bjjjbbaec98fheazcufgzmbkkavc:qdf8Kjjjjbk:0leoucuaicdtgvaicFFFFi0Egocbyd;q:I:cjbHjjjjbbhralalyd9GgwcdtfarBdbalawcefBd9GabarBdbaocbyd;q:I:cjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdlcuadcdtadcFFFFi0Ecbyd;q:I:cjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdwabydbcbavz:xjjjb8AabydbhraehladhvinaralydbcdtfgoaoydbcefBdbalclfhlavcufgvmbkcbhvabydlglhoarhwaihDinaoavBdbaoclfhoawydbavfhvawclfhwaDcufgDmbkadci9Uhqdnadcd9nmbabydwhocbhvinaecwfydbhwaeclfydbhDalaeydbcdtfgbabydbgbcefBdbaoabcdtfavBdbalaDcdtfgDaDydbgDcefBdbaoaDcdtfavBdbalawcdtfgwawydbgwcefBdbaoawcdtfavBdbaecxfheaqavcefgv9hmbkkinalalydbarydb9RBdbarclfhralclfhlaicufgimbkkQbabaeadaic;G:G:cjbz:ojjjbkQbabaeadaic;i:H:cjbz:ojjjbk9DeeuabcFeaicdtz:xjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk:3vioud9:du8Jjjjjbc;Wa9Rgl8Kjjjjbcbhvalcxfcbc;Kbz:xjjjb8AalcuadcitgoadcFFFFe0Ecbyd;q:I:cjbHjjjjbbgrBdxalceBd2araeadaicezNjjjbalcuaoadcjjjjoGEcbyd;q:I:cjbHjjjjbbgwBdzadcdthednadTmbabhiinaiavBdbaiclfhiadavcefgv9hmbkkawaefhDalabBdwalawBdl9cbhqindnadTmbaq9cq9:hkarhvaDhiadheinaiav8Pibak1:NcFrG87ebavcwfhvaicdfhiaecufgembkkalclfaq:NceGcdtfydbhxalclfaq9ce98gq:NceGcdtfydbhmalc;Wbfcbcjaz:xjjjb8AaDhvadhidnadTmbinalc;Wbfav8VebcdtfgeaeydbcefBdbavcdfhvaicufgimbkkcbhvcbhiinalc;WbfavfgeydbhoaeaiBdbaoaifhiavclfgvcja9hmbkadhvdndnadTmbinalc;WbfaDamydbgicetf8VebcdtfgeaeydbgecefBdbaxaecdtfaiBdbamclfhmavcufgvmbkaq9cv9smdcbhvinabawydbcdtfavBdbawclfhwadavcefgv9hmbxdkkaq9cv9smekkcwhvcbhiinalcxfavfc98fydbcbyd;u:I:cjbH:bjjjbbaiceGheclhvcehiaeTmbkalc;Waf8Kjjjjbk:Awliuo99iud9:cbhv8Jjjjjbca9Rgocbyd:4:I:cjbBdKaocb8Pd:W:I:cjb83izaocbyd;e:I:cjbBdwaocb8Pd:8:I:cjb83ibaicd4hrdndnadmbJFFuFhwJFFuuhDJFFuuhqJFFuFhkJFFuuhxJFFuFhmxekarcdthPaehsincbhiinaoczfaifgzasaifIdbgwazIdbgDaDaw9EEUdbaoaifgzawazIdbgDaDaw9DEUdbaiclfgicx9hmbkasaPfhsavcefgvad9hmbkaoIdKhDaoIdwhwaoIdChqaoIdlhkaoIdzhxaoIdbhmkdnadTmbJbbbbJbFu9hJbbbbamax:tgmamJbbbb9DEgmakaq:tgkakam9DEgkawaD:tgwawak9DEgw:vawJbbbb9BEhwdnalmbarcdthoindndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:S9cC:ghHdndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikaHai:S:ehHdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaHai:T9cy:g:e83ibaeaofheabcwfhbadcufgdmbxdkkarcdthoindndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cv9:9c;j:KM;j:KM;j:Kd:dhOdndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cq9:9cM;j:KM;j:KM;jl:daO:ehOdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaOai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cC9:9c:KM;j:KM;j:KMD:d:e83ibaeaofheabcwfhbadcufgdmbkkk9teiucbcbyd;y:I:cjbgeabcifc98GfgbBd;y:I:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;y:I:cjbgeabcrfc94GfgbBd;y:I:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikTeeucbabcbyd;y:I:cjbge9Rcifc98GaefgbBd;y:I:cjbdnabZbcztge9nmbabae9RcFFifcz4nb8Akkk;Sddbcj:Gdk;idbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbbbbbbbbbbbbbbbbebbbdbbbbbbbebbbbbbbbbbbbbbbb4:h9w9N94:P:gW:j9O:ye9Pbbbbbb:l29hZ;69:9kZ;N;76Z;rg97Z;z;o9xZ8J;B85Z;:;u9yZ;b;k9HZ:2;Z9DZ9e:l9mZ59A8KZ:r;T3Z:A:zYZ79OHZ;j4::8::Y:D9V8:bbbb9s:49:Z8R:hBZ9M9M;M8:L;z;o8:;8:PG89q;x:J878R:hQ8::M:B;e87bbbbbbjZbbjZbbjZ:E;V;N8::Y:DsZ9i;H;68:xd;R8:;h0838:;W:NoZbbbb:WV9O8:uf888:9i;H;68:9c9G;L89;n;m9m89;D8Ko8:bbbbf:8tZ9m836ZS:2AZL;zPZZ818EZ9e:lxZ;U98F8:819E;68:FFuuFFuuFFuuFFuFFFuFFFuFbc;i:IdkCebbbebbbebbbdbbb9G:rbb";
  var wasmpack = new Uint8Array([
    32,
    0,
    65,
    2,
    1,
    106,
    34,
    33,
    3,
    128,
    11,
    4,
    13,
    64,
    6,
    253,
    10,
    7,
    15,
    116,
    127,
    5,
    8,
    12,
    40,
    16,
    19,
    54,
    20,
    9,
    27,
    255,
    113,
    17,
    42,
    67,
    24,
    23,
    146,
    148,
    18,
    14,
    22,
    45,
    70,
    69,
    56,
    114,
    101,
    21,
    25,
    63,
    75,
    136,
    108,
    28,
    118,
    29,
    73,
    115
  ]);
  if (typeof WebAssembly !== "object") {
    return {
      supported: false
    };
  }
  var instance;
  var ready = WebAssembly.instantiate(unpack(wasm), {}).then(function(result) {
    instance = result.instance;
    instance.exports.__wasm_call_ctors();
    instance.exports.meshopt_encodeVertexVersion(1);
    instance.exports.meshopt_encodeIndexVersion(1);
  });
  function unpack(data) {
    var result = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
      var ch = data.charCodeAt(i);
      result[i] = ch > 96 ? ch - 97 : ch > 64 ? ch - 39 : ch + 4;
    }
    var write = 0;
    for (var i = 0; i < data.length; ++i) {
      result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
    }
    return result.buffer.slice(0, write);
  }
  function assert(cond) {
    if (!cond) {
      throw new Error("Assertion failed");
    }
  }
  function bytes(view) {
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  }
  function reorder(fun, indices, vertices, optf) {
    var sbrk = instance.exports.sbrk;
    var ip = sbrk(indices.length * 4);
    var rp = sbrk(vertices * 4);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    var indices8 = bytes(indices);
    heap.set(indices8, ip);
    if (optf) {
      optf(ip, ip, indices.length, vertices);
    }
    var unique = fun(rp, ip, indices.length, vertices);
    heap = new Uint8Array(instance.exports.memory.buffer);
    var remap = new Uint32Array(vertices);
    new Uint8Array(remap.buffer).set(heap.subarray(rp, rp + vertices * 4));
    indices8.set(heap.subarray(ip, ip + indices.length * 4));
    sbrk(ip - sbrk(0));
    for (var i = 0; i < indices.length; ++i) indices[i] = remap[indices[i]];
    return [remap, unique];
  }
  function spatialsort(fun, positions, count, stride) {
    var sbrk = instance.exports.sbrk;
    var ip = sbrk(count * 4);
    var sp = sbrk(count * stride);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(positions), sp);
    fun(ip, sp, count, stride);
    heap = new Uint8Array(instance.exports.memory.buffer);
    var remap = new Uint32Array(count);
    new Uint8Array(remap.buffer).set(heap.subarray(ip, ip + count * 4));
    sbrk(ip - sbrk(0));
    return remap;
  }
  function encode(fun, bound, source, count, size, level, version) {
    var sbrk = instance.exports.sbrk;
    var tp = sbrk(bound);
    var sp = sbrk(count * size);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(source), sp);
    var res = fun(tp, bound, sp, count, size, level, version);
    var target = new Uint8Array(res);
    target.set(heap.subarray(tp, tp + res));
    sbrk(tp - sbrk(0));
    return target;
  }
  function maxindex(source) {
    var result = 0;
    for (var i = 0; i < source.length; ++i) {
      var index = source[i];
      result = result < index ? index : result;
    }
    return result;
  }
  function index32(source, size) {
    assert(size == 2 || size == 4);
    if (size == 4) {
      return new Uint32Array(source.buffer, source.byteOffset, source.byteLength / 4);
    } else {
      var view = new Uint16Array(source.buffer, source.byteOffset, source.byteLength / 2);
      return new Uint32Array(view);
    }
  }
  function filter(fun, source, count, stride, bits, insize, mode) {
    var sbrk = instance.exports.sbrk;
    var tp = sbrk(count * stride);
    var sp = sbrk(count * insize);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(source), sp);
    fun(tp, count, stride, bits, sp, mode);
    var target = new Uint8Array(count * stride);
    target.set(heap.subarray(tp, tp + count * stride));
    sbrk(tp - sbrk(0));
    return target;
  }
  return {
    ready,
    supported: true,
    reorderMesh: function(indices, triangles, optsize) {
      assert(indices instanceof Uint32Array || indices instanceof Int32Array);
      assert(!triangles || indices.length % 3 == 0);
      var optf = triangles ? optsize ? instance.exports.meshopt_optimizeVertexCacheStrip : instance.exports.meshopt_optimizeVertexCache : void 0;
      return reorder(instance.exports.meshopt_optimizeVertexFetchRemap, indices, maxindex(indices) + 1, optf);
    },
    reorderPoints: function(positions, positions_stride) {
      assert(positions instanceof Float32Array);
      assert(positions.length % positions_stride == 0);
      assert(positions_stride >= 3);
      return spatialsort(instance.exports.meshopt_spatialSortRemap, positions, positions.length / positions_stride, positions_stride * 4);
    },
    encodeVertexBuffer: function(source, count, size) {
      assert(size > 0 && size <= 256);
      assert(size % 4 == 0);
      var bound = instance.exports.meshopt_encodeVertexBufferBound(count, size);
      return encode(instance.exports.meshopt_encodeVertexBuffer, bound, source, count, size);
    },
    encodeVertexBufferLevel: function(source, count, size, level, version) {
      assert(size > 0 && size <= 256);
      assert(size % 4 == 0);
      assert(level >= 0 && level <= 3);
      assert(version === void 0 || version == 0 || version == 1);
      var bound = instance.exports.meshopt_encodeVertexBufferBound(count, size);
      return encode(instance.exports.meshopt_encodeVertexBufferLevel, bound, source, count, size, level, version === void 0 ? -1 : version);
    },
    encodeIndexBuffer: function(source, count, size) {
      assert(size == 2 || size == 4);
      assert(count % 3 == 0);
      var indices = index32(source, size);
      var bound = instance.exports.meshopt_encodeIndexBufferBound(count, maxindex(indices) + 1);
      return encode(instance.exports.meshopt_encodeIndexBuffer, bound, indices, count, 4);
    },
    encodeIndexSequence: function(source, count, size) {
      assert(size == 2 || size == 4);
      var indices = index32(source, size);
      var bound = instance.exports.meshopt_encodeIndexSequenceBound(count, maxindex(indices) + 1);
      return encode(instance.exports.meshopt_encodeIndexSequence, bound, indices, count, 4);
    },
    encodeGltfBuffer: function(source, count, size, mode, version) {
      var table = {
        ATTRIBUTES: this.encodeVertexBufferLevel,
        TRIANGLES: this.encodeIndexBuffer,
        INDICES: this.encodeIndexSequence
      };
      assert(table[mode]);
      return table[mode](
        source,
        count,
        size,
        /* level= */
        2,
        version === void 0 ? 0 : version
      );
    },
    encodeFilterOct: function(source, count, stride, bits) {
      assert(stride == 4 || stride == 8);
      assert(bits >= 2 && bits <= 16);
      return filter(instance.exports.meshopt_encodeFilterOct, source, count, stride, bits, 16);
    },
    encodeFilterQuat: function(source, count, stride, bits) {
      assert(stride == 8);
      assert(bits >= 4 && bits <= 16);
      return filter(instance.exports.meshopt_encodeFilterQuat, source, count, stride, bits, 16);
    },
    encodeFilterExp: function(source, count, stride, bits, mode) {
      assert(stride > 0 && stride % 4 == 0);
      assert(bits >= 1 && bits <= 24);
      var table = {
        Separate: 0,
        SharedVector: 1,
        SharedComponent: 2,
        Clamped: 3
      };
      assert(!mode || mode in table);
      return filter(instance.exports.meshopt_encodeFilterExp, source, count, stride, bits, stride, mode ? table[mode] : 1);
    },
    encodeFilterColor: function(source, count, stride, bits) {
      assert(stride == 4 || stride == 8);
      assert(bits >= 2 && bits <= 16);
      return filter(instance.exports.meshopt_encodeFilterColor, source, count, stride, bits, 16);
    }
  };
})();

// node_modules/meshoptimizer/meshopt_decoder.mjs
var MeshoptDecoder = (function() {
  var wasm_base = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq;X8:kdbk:kYi5ud9:du8Jjjjjbcjq9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCaAcethXaxaDfhiaOaeaoaeao6E9RhQalcl4cifcd4hLazcjdfaAfhKcbhYabaOad2fg8AhEaHh3incbh5dnawTmbaxaYcd4fRbbh5kcbh8Eazcjdfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcjdfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcjdfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaL6mva8FaLfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasaYcd4fRbbgociGPlbedrbkaATmdazaYfh8Fazcjdfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeazaYfhaazcjdfhhcbhoceh8EaKh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaQaocefgofmbka8FaXfh8FcdhoaacdfhaahaXfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8EazaYfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaKhainazcjdfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3aYclfgYad6mbkaza8AaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcjqf8Kjjjjbaok:bsesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb";
  var wasm_simd = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:I9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:SBlEud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fgOavcjdfasaeaH9RaHasfae6EgAaAcsfgoc9WGgCSEhXaPaDfhQaocl4cifcd4hLavcj;cbfaCcetfhKavcj;cbfaCci2fhYavcj;cbfaCfh8AcbhEaoc;ab6h3incbh5dnawTmbaPaEcd4fRbbh5kcbh8Eavcj;cbfh8Findndndndna5a8Ecet4ciGgoc9:fPdebdkaxaQ9RaC6mwdnaCTmbavcj;cbfa8EaC2faQaC;8qbbkaQaAfhQxdkaCTmeavcj;cbfa8EaC2fcbaC;8kbxekaxaQ9RaL6moaoclVcbawEhraQaLfhocbhidna3mbaxao9Rc;Gb6mbcbhlina8FalfhidndndndndndnaQalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiczfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaicafaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaC0meaihlaxao9Rc;Fb0mbkkdnaiaC9pmbaici4hlinaxao9RcK6mwa8FaifhqdndndndndndnaQaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaoclffa8JRb:q:W:cjbfhoxikaqaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaocwffa8JRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbagaocdffa8JRb:q:W:cjbfhokalcdfhlaiczfgiaC6mbkkaohQaoTmoka8FaCfh8Fa8Ecefg8Ecl9hmbkdndndndnawTmbazaEcd4fRbbglciGPlbedwbkaCTmdaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep9Taapxeeeeeeeeeeeeeeeeghp9op9Hp9rgaa8Kp9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ughp9Abbbaladfglahaaaapmlvorlvorlvorlvorp9Ughp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp9Ughp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9AbbbaladfhlaoczfgoaC6mbxikkaCTmeaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep:neaapxebebebebebebebebghp9op:bep9rgaa8Kp:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeghp9Abbbaladfglahaaaapmlvorlvorlvorlvorp:oeghp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp:oeghp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9AbbbaladfhlaoczfgoaC6mbxdkkaCTmbaXaEfhrcbhocbalcl4gl9Rc8FGhiavaEfpbdbhhinaravcj;cbfaofpblbg8Ka8Aaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaKaofpblbg8NaYaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgaahp9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ma8PpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9AbbbaradfhraoczfgoaC6mbkkaEclfgEad6mbkdnaXavcjdf9hmbaAad2goTmbaOavcjdfao;8qbbkdnammbavaXaAcufad2fad;8qbbkaAaHfhHc9:hoaQhPaQmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkpPesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb";
  var detector = new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    4,
    1,
    96,
    0,
    0,
    3,
    3,
    2,
    0,
    0,
    5,
    3,
    1,
    0,
    1,
    12,
    1,
    0,
    10,
    22,
    2,
    12,
    0,
    65,
    0,
    65,
    0,
    65,
    0,
    252,
    10,
    0,
    0,
    11,
    7,
    0,
    65,
    0,
    253,
    15,
    26,
    11
  ]);
  var wasmpack = new Uint8Array([
    32,
    0,
    65,
    2,
    1,
    106,
    34,
    33,
    3,
    128,
    11,
    4,
    13,
    64,
    6,
    253,
    10,
    7,
    15,
    116,
    127,
    5,
    8,
    12,
    40,
    16,
    19,
    54,
    20,
    9,
    27,
    255,
    113,
    17,
    42,
    67,
    24,
    23,
    146,
    148,
    18,
    14,
    22,
    45,
    70,
    69,
    56,
    114,
    101,
    21,
    25,
    63,
    75,
    136,
    108,
    28,
    118,
    29,
    73,
    115
  ]);
  if (typeof WebAssembly !== "object") {
    return {
      supported: false
    };
  }
  var wasm = WebAssembly.validate(detector) ? unpack(wasm_simd) : unpack(wasm_base);
  var instance;
  var ready = WebAssembly.instantiate(wasm, {}).then(function(result) {
    instance = result.instance;
    instance.exports.__wasm_call_ctors();
  });
  function unpack(data) {
    var result = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
      var ch = data.charCodeAt(i);
      result[i] = ch > 96 ? ch - 97 : ch > 64 ? ch - 39 : ch + 4;
    }
    var write = 0;
    for (var i = 0; i < data.length; ++i) {
      result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
    }
    return result.buffer.slice(0, write);
  }
  function decode(instance2, fun, target, count, size, source, filter) {
    var sbrk = instance2.exports.sbrk;
    var count4 = count + 3 & ~3;
    var tp = sbrk(count4 * size);
    var sp = sbrk(source.length);
    var heap = new Uint8Array(instance2.exports.memory.buffer);
    heap.set(source, sp);
    var res = fun(tp, count, size, sp, source.length);
    if (res == 0 && filter) {
      filter(tp, count4, size);
    }
    target.set(heap.subarray(tp, tp + count * size));
    sbrk(tp - sbrk(0));
    if (res != 0) {
      throw new Error("Malformed buffer data: " + res);
    }
  }
  var filters = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp",
    COLOR: "meshopt_decodeFilterColor"
  };
  var decoders = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  };
  var workers = [];
  var requestId = 0;
  function createWorker2(url) {
    var worker = {
      object: new Worker(url),
      pending: 0,
      requests: {}
    };
    worker.object.onmessage = function(event) {
      var data = event.data;
      worker.pending -= data.count;
      worker.requests[data.id][data.action](data.value);
      delete worker.requests[data.id];
    };
    return worker;
  }
  function initWorkers(count) {
    var source = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(wasm) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + workerProcess.name + ";" + decode.toString() + workerProcess.toString();
    var blob = new Blob([source], { type: "text/javascript" });
    var url = URL.createObjectURL(blob);
    for (var i = workers.length; i < count; ++i) {
      workers[i] = createWorker2(url);
    }
    for (var i = count; i < workers.length; ++i) {
      workers[i].object.postMessage({});
    }
    workers.length = count;
    URL.revokeObjectURL(url);
  }
  function decodeWorker(count, size, source, mode, filter) {
    var worker = workers[0];
    for (var i = 1; i < workers.length; ++i) {
      if (workers[i].pending < worker.pending) {
        worker = workers[i];
      }
    }
    return new Promise(function(resolve, reject) {
      var data = new Uint8Array(source);
      var id = ++requestId;
      worker.pending += count;
      worker.requests[id] = { resolve, reject };
      worker.object.postMessage({ id, count, size, source: data, mode, filter }, [data.buffer]);
    });
  }
  function workerProcess(event) {
    var data = event.data;
    self.ready.then(function(instance2) {
      if (!data.id) {
        return self.close();
      }
      try {
        var target = new Uint8Array(data.count * data.size);
        decode(instance2, instance2.exports[data.mode], target, data.count, data.size, data.source, instance2.exports[data.filter]);
        self.postMessage({ id: data.id, count: data.count, action: "resolve", value: target }, [target.buffer]);
      } catch (error) {
        self.postMessage({ id: data.id, count: data.count, action: "reject", value: error });
      }
    });
  }
  return {
    ready,
    supported: true,
    useWorkers: function(count) {
      initWorkers(count);
    },
    decodeVertexBuffer: function(target, count, size, source, filter) {
      decode(instance, instance.exports.meshopt_decodeVertexBuffer, target, count, size, source, instance.exports[filters[filter]]);
    },
    decodeIndexBuffer: function(target, count, size, source) {
      decode(instance, instance.exports.meshopt_decodeIndexBuffer, target, count, size, source);
    },
    decodeIndexSequence: function(target, count, size, source) {
      decode(instance, instance.exports.meshopt_decodeIndexSequence, target, count, size, source);
    },
    decodeGltfBuffer: function(target, count, size, source, mode, filter) {
      decode(instance, instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
    },
    decodeGltfBufferAsync: function(count, size, source, mode, filter) {
      if (workers.length > 0) {
        return decodeWorker(count, size, source, decoders[mode], filters[filter]);
      }
      return ready.then(function() {
        var target = new Uint8Array(count * size);
        decode(instance, instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
        return target;
      });
    }
  };
})();

// node_modules/meshoptimizer/meshopt_simplifier.js
var MeshoptSimplifier = (function() {
  var wasm = "b9H79Tebbbe;veC9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gouuuuuue999Gvuuuuueu9Gzuuuuuuuuuuu99uuuub9Gquuuuuuu99uueu9GPuuuuuuuuuuu99uueu9Gquuuuuuuu99ueu9Gruuuuuu99eu9Gwuuuuuu99ueu9Giuuue999GDuuuuuuuuueu9Gkuuuuuuuu99uub9Gluuuueu9Gluuuub9Giuuueui3EdilvorlwDiqkrxmPszdHObAAbeAlve9Weiiviebeoweuecj:Gdkr:Sdmo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95bw8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bD8A9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9O9v9W9K9HtWbqQ9TW79O9V9Wt9F79P9T9W29P9M959t29V9W9W95bkX9TW79O9V9Wt9F79P9T9W29P9M959qV919UWbmQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bPX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2WbsP9TW79O9V9Wt9FVW9TW79Obza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbA59TW79O9V9Wt9F9NW9UWV9HtW9q9V79Pt9P9V9U9sW9T9H9WbCl79IV9RbXDwebcekdKYq:p:1dElbzOk:Q:tekYue99iuQ99eui99Due99xue9:w998Jjjjjbcj;sb9Rgs8Kjjjjbcbhzasc:Cefcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkdnamcdGTmbalcrfci4cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egecdtfaHBdbasaecefBd;8ecbhlcbhednadTmbabheadhOinaHaeydbci4fcb86bbaeclfheaOcufgOmbkcbhlabheadhOinaHaeydbgAci4fgCaCRbbgCceaAcrGgAtV86bbaCcu7aA4ceGalfhlaeclfheaOcufgOmbkcualcdtalcFFFFi0Ehekaecbyd;y:L:cjbHjjjjbbhzasc:Cefasyd;8egecdtfazBdbasaecefBd;8ealcd4alfhOcehHinaHgecethHaeaO6mbkcbhXcuaecdtgOaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egAcdtfaHBdbasaAcefBd;8eaHcFeaOz:xjjjbhQdnadTmbaecufhLcbhKindndnaQabaKcdtfgYydbgAc:v;t;h;Ev2aLGgOcdtfgCydbgHcuSmbceheinazaHcdtfydbaASmdaOaefhHaecefheaQaHaLGgOcdtfgCydbgHcu9hmbkkazaXcdtfaABdbaCaXBdbaXhHaXcefhXkaYaHBdbaKcefgKad9hmbkkaQcbyd;C:L:cjbH:bjjjbbasasyd;8ecufBd;8ekcbh8AcualcefgecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhKasc:Cefasyd;8egecdtfaKBdbasaKBdNeasaecefBd;8ecuadcitadcFFFFe0Ecbyd;y:L:cjbHjjjjbbhEasc:Cefasyd;8egecdtfaEBdbasaEBd:yeasaecefBd;8eascNefabadalcbz:cjjjbcualcdtgealcFFFFi0Eg3cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egOcdtfaHBdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhXasc:Cefasyd;8egOcdtfaXBdbasaOcefBd;8eaHaXaialavazasc:Cefz:djjjbalcbyd;y:L:cjbHjjjjbbh5asc:Cefasyd;8egOcdtfa5BdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhOasc:Cefasyd;8egAcdtfaOBdbasaAcefBd;8ea3cbyd;y:L:cjbHjjjjbbhAasc:Cefasyd;8egCcdtfaABdbasaCcefBd;8eaOcFeaez:xjjjbh8EaAcFeaez:xjjjbh8FdnalTmbindnaKa8AgAcefg8AcdtfydbgCaKaAcdtgefydbgOSmbaCaO9RhYaEaOcitfhaa8Faefhha8EaefhLcbhCindndnaaaCcitfydbgQaA9hmbaLaABdbahaABdbxekdnaKaQcdtggfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheinaeydbaASmdaecwfheaOcufgOmbkka8FagfgeaAaQaeydbcuSEBdbaLaQaAaLydbcuSEBdbkaCcefgCaY9hmbkka8Aal9hmbkaHhOaXhAa8EhQa8FhCcbheindndnaeaOydbgL9hmbdnaeaAydbgL9hmbaQydbhLdnaCydbgYcu9hmbaLcu9hmba5aefcb86bbxikdnaYcuSmbaLcuSmbaeaYSmbaHaYcdtfydbaHaLcdtfydb9hmba5aefcd86bbxika5aefhadnaeaYSmbaeaLSmbaace86bbxikaacv86bbxdkdnaeaXaLcdtgYfydb9hmbdnaCydbgacuSmbaeaaSmbaQydbggcuSmbaeagSmba8FaYfydbghcuSmbahaLSmba8EaYfydbgYcuSmbaYaLSmbaHaacdtfydbgLaHaYcdtfydb9hmbaLaHagcdtfydbgYSmbaYaHahcdtfydb9hmba5aefcd86bbxika5aefcv86bbxdka5aefcv86bbxeka5aefa5aLfRbb86bbkaOclfhOaAclfhAaQclfhQaCclfhCalaecefge9hmbkdnamcaGTmbcbh8Jindndna5a8Jfg8KRbbg8Lc9:fPlbeebekdndndnaHa8Jcdtfydbgea8J9hmbcbhYcbh8MaqTmednazTmbcbh8Ma8JheinaqazaecdtgefydbfRbbce4a8MVceGh8MaXaefydbgea8J9hmbxikkcbh8Ma8JheinaqaefRbbce4a8MVceGh8MaXaecdtfydbgea8J9hmbxdkka5aefRbbhexeka8JheindnaKaecdtg8AfgeclfydbgOaeydbgeSmbaOae9RhgaEaecitfhhaHa8AfhacbhLinahaLcitfydbgQhednindnaKaecdtgCfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheaaydbhAdninaHaeydbcdtfydbaASmeaecwfheaOcufgOTmdxbkkcbhexdkaXaCfydbgeaQ9hmbkcehekaYaeVhYaLcefgLag9hmbkkaXa8Afydbgea8J9hmbka8LclciaYceGEa8MEheka8Kae86bbka8Jcefg8Jal9hmbkkdnaqTmbdndnazTmbazheaHhOalhAindnaqaeydbfRbbceGTmba5aOydbfcv86bbkaeclfheaOclfhOaAcufgAmbxdkkaqheaHhOalhAindnaeRbbceGTmba5aOydbfcv86bbkaecefheaOclfhOaAcufgAmbkkaHhealhAa5hOindna5aeydbfRbbcv9hmbaOcv86bbkaeclfheaOcefhOaAcufgAmbkkamceGTmba5healhOindndnaeRbbcufPlbeebekaecv86bbkaecefheaOcufgOmbkkcbh8Ncualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh8Kasc:Cefasyd;8egecdtfa8KBdbasaecefBd;8eascbBd:qeas9cb83i1ea8Kaialavazasc1efz:ejjjbhydndnaDmbcbh8PcbhaxekcbhaawhecbhOindnaeIdbJbbbb9ETmbasaacdtfaOBdbaacefhakaeclfheaDaOcefgO9hmbkcuaaal2gecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbh8Pasc:Cefasyd;8egecdtfa8PBdbasaecefBd;8ealTmbdnaambcbhaxekarcd4hgdnazTmbaacdthhcbhLa8PhYinaoazaLcdtfydbag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbxdkkaacdthhcbhLa8PhYinaoaLag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbkkcualc8S2gOalc;D;O;f8U0EgCcbyd;y:L:cjbHjjjjbbheasc:Cefasyd;8egAcdtfaeBdbasaAcefBd;8eaecbaOz:xjjjbhIcbh8RcbhgdnaaTmbcbh8NaCcbyd;y:L:cjbHjjjjbbhgasc:Cefasyd;8egecdtfagBdbasaecefBd;8eagcbaOz:xjjjb8Acuaaal2gecltgOaecFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Rasc:Cefasyd;8egecdtfa8RBdbasaecefBd;8ea8RcbaOz:xjjjb8AamcjjjjdGTmbcualcltgealcFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Nasc:Cefasyd;8egOcdtfa8NBdbasaOcefBd;8ea8Ncbaez:xjjjb8AkdnadTmbcbhQabhOina8KaOclfydbgLcx2fgeIdba8KaOydbgYcx2fgAIdbg8S:tgRa8KaOcwfydbghcx2fgCIdlaAIdlg8U:tg8VNaeIdla8U:tg8WaCIdba8S:tg8XN:tg8Ya8YNa8WaCIdwaAIdwg8Z:tg80NaeIdwa8Z:tg8Wa8VN:tg81a81Na8Wa8XNaRa80N:tg80a80NMMg8V:rhBa8Yh8Xa80h8Wa81hRdna8VJbbbb9EgATmba8YaB:vh8Xa80aB:vh8Wa81aB:vhRkaIaHaYcdtfydbgCc8S2fgeaRaB:rg8VaRNNg83aeIdbMUdbaea8Wa8Va8WNgUNg85aeIdlMUdlaea8Xa8Va8XNg86Ng87aeIdwMUdwaeaRaUNgUaeIdxMUdxaea86aRNg88aeIdzMUdzaea8Wa86Ng89aeIdCMUdCaeaRa8Va8Xa8ZNaRa8SNa8Ua8WNMM:mg8:Ng86NgRaeIdKMUdKaea8Wa86Ng8WaeId3MUd3aea8Xa86Ng8XaeIdaMUdaaea86a8:Ng86aeId8KMUd8Kaea8VaeIdyMUdyaIaHaLcdtfydbgLc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdyaIaHahcdtfydbgYc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdydna8NTmbdnaATmba8YaB:vh8Ya80aB:vh80a81aB:vh81ka8NaCcltfgeaBJbbbZNgRa80Ng8VaeIdlMUdlaeaRa8YNg8WaeIdwMUdwaeaRa81Ng8XaeIdbMUdbaeaRa8S:ma81Na8Ua80N:ta8Za8YN:tNgRaeIdxMUdxa8NaLcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxa8NaYcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxkaOcxfhOaQcifgQad6mbkkdnalTmbJq;x8J88J;n;m;m89J:v:;;w8ZamczGEamc;abGEh80cbhOaHhCazhQaIhea8KhAindnaOaCydb9hmbaOhLdnazTmbaQydbhLka80hRdnaqTmbJbbjZa80aqaLfRbbclGEhRkaecxfgLaLIdbJbbbbMUdbaeczfgLaLIdbJbbbbMUdbaecCfgLaLIdbJbbbbMUdbaeaRaecyfgLIdbg8YNgRaeIdbMUdbaeclfgYaRaYIdbMUdbaecwfgYaRaYIdbMUdbaecKfgYaYIdbaAIdbg8WaRN:tUdbaAcwfIdbh8Vaec3fgYaYIdbaRaAclfIdbg8XN:tUdbaecafgYaYIdbaRa8VN:tUdbaec8KfgYIdbh81aLa8YaRMUdbaYa81aRa8Va8VNa8Wa8WNa8Xa8XNMMNMUdbkaCclfhCaQclfhQaec8SfheaAcxfhAalaOcefgO9hmbkkdnadTmbcbh8AabhLinaba8AcdtfhYcbheindna5aLaefydbgCfRbbgOTmba5aYaec:G:G:cjbfydbcdtfydbgQfRbbcFeGgATmbdnaOclSghmbaOci6mbaAclSmbaAcd0mekdnaOcd0mba8EaCcdtfydbaQ9hmekdnaAcd0mba8FaQcdtfydbaC9hmekdndnahmbaAcl9hmekaOciSmeaAciSmekJbbbZJbbbZJbbacaAcdSEaOcdSEhUdna8KaYaec:K:G:cjbfydbcdtfydbcx2fgOIdwa8KaCcx2fgAIdwg86:tg8Sa8KaQcx2fghIdwa86:tg8Xa8XNahIdbaAIdbg8U:tg80a80NahIdlaAIdlg8Z:tg8Va8VNMMg81Na8Xa8Sa8XNaOIdba8U:tg83a80Na8VaOIdla8Z:tg85NMMg8WN:tg8Ya8YNa83a81Na80a8WN:tgRaRNa85a81Na8Va8WN:tg8Wa8WNMMgBJbbbb9ETmba8YaB:rgB:vh8Ya8WaB:vh8WaRaB:vhRkaUa81:rNgBa8Ya86NaRa8UNa8Za8WNMM:mg81Ng87a81Nh88a80a85Na8Va83N:tg81a81Na8Va8SNa8Xa85N:tg8Va8VNa8Xa83Na80a8SN:tg8Xa8XNMMg83:rh80a8Ya87Nh85a8Wa87Nh89aRa87Nh87a8WaBa8YNg8SNh8:a8SaRNhZaRaBa8WNgnNhca8Ya8SNh8Ya8WanNh8WaRaBaRNNh8Sdna83Jbbbb9ETmba81a80:vh81a8Xa80:vh8Xa8Va80:vh8VkaIaHaCcdtfydbc8S2fgOaOIdba8Sa8VaUa80:rNgRa8VNNMg80MUdbaOa8Wa8XaRa8XNg8SNMg83aOIdlMUdlaOa8Ya81aRa81Ng8WNMg8YaOIdwMUdwaOaca8Va8SNMg8SaOIdxMUdxaOaZa8Wa8VNMgUaOIdzMUdzaOa8:a8Xa8WNMg8WaOIdCMUdCaOa87a8VaRa81a86Na8Va8UNa8Za8XNMMg86:mNgRNMg8VaOIdKMUdKaOa89a8XaRNMg8XaOId3MUd3aOa85a81aRNMg81aOIdaMUdaaOa88a86aRN:tgRaOId8KMUd8KaOaBaOIdyMUdyaIaHaQcdtfydbc8S2fgOa80aOIdbMUdbaOa83aOIdlMUdlaOa8YaOIdwMUdwaOa8SaOIdxMUdxaOaUaOIdzMUdzaOa8WaOIdCMUdCaOa8VaOIdKMUdKaOa8XaOId3MUd3aOa81aOIdaMUdaaOaRaOId8KMUd8KaOaBaOIdyMUdykaeclfgecx9hmbkaLcxfhLa8Acifg8Aad6mbkkdnamcjeGTmbalTmbcbh9cindnaKa9cgecdtgOfydbghaKaecefg9ccdtfydbg8M9pmba8Kaecx2fhDaIaHaOfydbgCc8S2fh8AindnaHaEahcitfgeydbgLcdtfydbg8JaC0mbaeydlh8LcuhAaLheindnaKaecdtgYfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheindnaHaeydbcdtfydbaC9hmbaAcu9hhQaLhAaQmbaeclfydbhAkaecwfheaOcufgOmbkkaXaYfydbgeaL9hmbkaAaLSmbaAcuSmba8KaLcx2fgeIdbaDIdbg81:tgRa8Ka8Lcx2fgOIdlaDIdlg80:tg8XNaeIdla80:tg8VaOIdba81:tg8YN:tg86a8KaAcx2fgAIdba81:tg8Za8VNaAIdla80:tg83aRN:tg8SNa8VaOIdwaDIdwgB:tg8UNaeIdwaB:tg8Wa8XN:tg85a83a8WNaAIdwaB:tg87a8VN:tgUNa8Wa8YNaRa8UN:tg88a87aRNa8Za8WN:tg89NMMa86a86Na85a85Na88a88NMM:rJ:A:z9z:;Na8Sa8SNaUaUNa89a89NMM:rN9Gmbdna8Ua8Wa8WNaRaRNa8Va8VNMMg8SNa8Wa8Ua8WNa8YaRNa8Va8XNMMg86N:tg8Ua8UNa8Ya8SNaRa86N:tg8Ya8YNa8Xa8SNa8Va86N:tg86a86NMMg8XJbbbb9ETmba8Ua8X:rg8X:vh8Ua86a8X:vh86a8Ya8X:vh8Yka8S:rg8Xa8UaBNa8Ya81Na80a86NMM:mgUNg85aUNhUa8Ua85Nh88a86a85Nh89a8Ya85Nh8:a86a8Xa8UNg85NhZa85a8YNhna8Ya8Xa86NgcNhJa8Ua85Nh8Ua86acNh86a8Ya8Xa8YNNh85dna87a8SNa8Wa87a8WNa8ZaRNa8Va83NMMg8YN:tg8Wa8WNa8Za8SNaRa8YN:tgRaRNa83a8SNa8Va8YN:tg8Va8VNMMg8YJbbbb9ETmba8Wa8Y:rg8Y:vh8Wa8Va8Y:vh8VaRa8Y:vhRka8Aa8AIdba85aRa8XaRNNMg8SMUdba8Aa86a8Va8Xa8VNg8ZNMg86a8AIdlMUdla8Aa8Ua8Wa8Xa8WNg8YNMg8Ua8AIdwMUdwa8AaJaRa8ZNMg8Za8AIdxMUdxa8Aana8YaRNMg83a8AIdzMUdza8AaZa8Va8YNMg85a8AIdCMUdCa8Aa8:aRa8Xa8WaBNaRa81Na80a8VNMMg81:mNg8YNMgRa8AIdKMUdKa8Aa89a8Va8YNMg8Va8AId3MUd3a8Aa88a8Wa8YNMg8Wa8AIdaMUdaa8AaUa81a8YN:tg8Ya8AId8KMUd8Ka8Aa8Xa8XMg8Xa8AIdyMUdyaIa8Jc8S2fgea8SaeIdbMUdbaea86aeIdlMUdlaea8UaeIdwMUdwaea8ZaeIdxMUdxaea83aeIdzMUdzaea85aeIdCMUdCaeaRaeIdKMUdKaea8VaeId3MUd3aea8WaeIdaMUdaaea8YaeId8KMUd8Kaea8XaeIdyMUdykahcefgha8M9hmbkka9cal9hmbkkdnadTmbaaTmbcbhYinJbbbbh80a8KabaYcdtfgeclfydbgLcx2fgOIdwa8Kaeydbghcx2fgAIdwg8Z:tg8Va8VNaOIdbaAIdbg83:tg8Wa8WNaOIdlaAIdlg85:tg8Xa8XNMMg8Sa8Kaecwfydbg8Acx2fgeIdwa8Z:tg8YNa8Va8YNa8WaeIdba83:tg81Na8XaeIdla85:tgBNMMgRa8VN:tJbbbbJbbjZa8Sa8Ya8YNa81a81NaBaBNMMg8UNaRaRN:tg86:va86Jbbbb9BEg86Nh88a8Ua8VNaRa8YN:ta86Nh89a8SaBNaRa8XN:ta86Nh8:a8Ua8XNaRaBN:ta86NhZa8Sa81NaRa8WN:ta86Nhna8Ua8WNaRa81N:ta86Nhca8WaBNa8Xa81N:tgRaRNa8Xa8YNa8VaBN:tgRaRNa8Va81Na8Wa8YN:tgRaRNMM:rJbbbZNhRa8Pahaa2g8JcdtfhOa8Pa8Aaa2g8McdtfhAa8PaLaa2gDcdtfhCa8Z:mhJa85:mh9ea83:mhTascjdfheaahQJbbbbhBJbbbbh86Jbbbbh8SJbbbbh8UJbbbbh8ZJbbbbh83Jbbbbh85Jbbbbh87JbbbbhUinaecwfaRa89aCIdbaOIdbg8Y:tg8XNa88aAIdba8Y:tg81NMg8VNUdbaeclfaRaZa8XNa8:a81NMg8WNUdbaeaRaca8XNana81NMg8XNUdbaecxfaRaJa8VNa9ea8WNa8YaTa8XNMMMg8YNUdbaRa8Va8WNNa8ZMh8ZaRa8Va8XNNa8UMh8UaRa8Wa8XNNa8SMh8SaRa8Ya8YNNaUMhUaRa8Va8YNNa87Mh87aRa8Wa8YNNa85Mh85aRa8Xa8YNNa83Mh83aRa8Va8VNNa86Mh86aRa8Wa8WNNaBMhBaRa8Xa8XNNa80Mh80aOclfhOaCclfhCaAclfhAaeczfheaQcufgQmbkagahc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyagaLc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyaga8Ac8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdya8Ra8JcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8RaDcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8Ra8McltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbkaYcifgYad6mbkkcbhAdndnamcwGgSmbJbbbbh86cbh9hcbh9icbh6xekcbh9ha3cbyd;y:L:cjbHjjjjbbh6asc:Cefasyd;8egecdtfa6BdbasaecefBd;8ecua6alabadaHz:fjjjbgCcltaCcjjjjiGEcbyd;y:L:cjbHjjjjbbh9iasc:Cefasyd;8egecdtfa9iBdbasaecefBd;8ea9iaCa6a8Kalz:gjjjbJFFuuh86aCTmba9iheaChOinaeIdbgRa86a86aR9EEh86aeclfheaOcufgOmbkaCh9hkdnalTmbaKclfheaKydbhCa5hOalhQcbhAincbaeydbgLaC9RaORbbcpeGEaAfhAaOcefhOaeclfheaLhCaQcufgQmbkaAce4hAkcuadaA9Rcifg9kcx2a9kc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh0asc:Cefasyd;8egecdtfa0BdbasaecefBd;8ecua9kcdta9kcFFFFi0Ecbyd;y:L:cjbHjjjjbbh9masc:Cefasyd;8egecdtfa9mBdbasaecefBd;8ea3cbyd;y:L:cjbHjjjjbbh9nasc:Cefasyd;8egecdtfa9nBdbasaecefBd;8ealcbyd;y:L:cjbHjjjjbbh9oasc:Cefasyd;8egecdtfa9oBdbasaecefBd;8eaxaxNayJbbjZamclGEg9pa9pN:vh87JbbbbhUdnadak9nmbdna9kci6mbamcjdGh9qaaclth9ra0cwfh9sJbbbbh85JbbbbhUinascNefabadalaHz:cjjjbabh8Acbh3cbh9tinaba9tcdtfh8McbheindnaHa8AaefydbgAcdtghfydbgCaHa8Maec:W:G:cjbfydbcdtfydbgOcdtg8JfydbgQSmba5aOfRbbgYco2a5aAfRbbgLfRb;a:G:cjbg8LaLco2aYfgDRb;a:G:cjbg9cVcFeGTmbdnaQaC9nmbaDRb;W:G:cjbcFeGmekdnaLcufcFeGce0mbaYTmba8EahfydbaO9hmekdnaLTmbaYcufcFeGce0mba8Fa8JfydbaA9hmeka0a3cx2fgCaOaAa9ccFeGgQEBdlaCaAaOaQEBdbaCaQa8LGcb9hBdwa3cefh3kaeclfgecx9hmbkdna9tcifg9tad9pmba8Acxfh8Aa3cifa9k9nmekka3TmdcbhDinaIaHa0aDcx2fghydbgLcdtgCfydbg8Jc8S2fgeIdwa8KahydlgYcx2fgOIdwg8WNaeIdzaOIdbg8XNaeIdaMgRaRMMa8WNaeIdlaOIdlg8YNaeIdCa8WNaeId3MgRaRMMa8YNaeIdba8XNaeIdxa8YNaeIdKMgRaRMMa8XNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8V:va8VJbbbb9BEh8Vdndnahydwg8MmbJFFuuhBxekJbbbbJbbjZaIaHaYcdtfydbc8S2fgeIdyg81:va81Jbbbb9BEaeIdwa8KaLcx2fgOIdwg81NaeIdzaOIdbg80NaeIdaMgBaBMMa81NaeIdlaOIdlgBNaeIdCa81NaeId3Mg81a81MMaBNaeIdba80NaeIdxaBNaeIdKMg81a81MMa80NaeId8KMMM:lNhBka8VaRNh80dnaaTmbagaLc8S2fgAIdwa8WNaAIdza8XNaAIdaMgRaRMMa8WNaAIdla8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaYaa2gQcdtfhOa8RaLaa2g8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaYc8S2fgAIdwa8KaLcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8AcdtfhOa8RaQcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBdndndna5aLfRbbc9:fPibeedkdna8Fa8Ea8EaCfydbaYSEaXaCfydbgQcdtfydbgCcu9hmbaXaYcdtfydbhCkagaQc8S2fgAIdwa8KaCcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaCaa2g8AcdtfhOa8RaQaa2g8JcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaCc8S2fgAIdwa8KaQcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8JcdtfhOa8Ra8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBxdkaXaCfydbgCaLSmbaHaYcdtfydbh8Aindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8ASmekdna8FaQfydbgecuSmbaHaecdtfydba8ASmekaYhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbka80aR:lgRa81aRa819DEaRa9qEMh80aXaQfydbgCaL9hmbkkdna5aYfRbbgeciSmbaecl9hmeka8MTmbaXaYcdtfydbgCaYSmbindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8JSmekdna8FaQfydbgecuSmbaHaecdtfydba8JSmekaLhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaBaR:lgRa81aRa819DEaRa9qEMhBaXaQfydbgCaY9hmbkkahaBa80aBa809DgeEUdwahaLaYaea8Mcb9hGgeEBdlahaYaLaeEBdbaDcefgDa39hmbkascjdfcbcj;qbz:xjjjb8Aa9shea3hOinascjdfaeydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbcefBdbaecxfheaOcufgOmbkcbhecbhOinascjdfaefgAydbhCaAaOBdbaCaOfhOaeclfgecj;qb9hmbkcbhea9shOinascjdfaOydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbgAcefBdba9maAcdtfaeBdbaOcxfhOa3aecefge9hmbkadak9RgAci9Uh9udnalTmbcbhea9nhOinaOaeBdbaOclfhOalaecefge9hmbkkcbh9va9ocbalz:xjjjbh9caAcO9Uh9wa9uce4h9tcbh8Lcbh8Mdnina0a9ma8Mcdtfydbcx2fg8JIdwgRa879Emea8La9u9pmeJFFuuh8Vdna9ta39pmba0a9ma9tcdtfydbcx2fIdwJbb;aZNh8VkdnaRa8V9ETmbaRaU9ETmba8La9w0mdkdna9caHa8JydlgDcdtg9xfg8AydbgAfg9yRbba9caHa8Jydbghcdtg9zfydbgefg9ARbbVmba5ahfRbbh9BdndnaKaecdtfgOclfydbgCaOydbgOSmbaCaO9RhCa8KaAcx2fhLa8Kaecx2fhYaEaOcitfheindna9naeydbcdtfydbgOaASmba9naeclfydbcdtfydbgQaASmbaOaQSmba8KaQcx2fgQIdba8KaOcx2fgOIdbg8W:tgRaYIdlaOIdlg8X:tg80NaQIdla8X:tg8VaYIdba8W:tgBN:tg8YaRaLIdla8X:tg8SNa8VaLIdba8W:tg8UN:tg8XNa8VaYIdwaOIdwg81:tg8ZNaQIdwa81:tg8Wa80N:tg80a8VaLIdwa81:tg83Na8Wa8SN:tg8VNa8WaBNaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmikaecwfheaCcufgCmbkkdndna9Bc99fcFeGce0mba9na9zfaDBdbaXa9zfydbgeahSmeina8AydbhAdndna8EaecdtgOfydbgecuSmbaHaecdtfydbaASmekdna8FaOfydbgecuSmbaHaecdtfydbaASmekaDheka9naOfaeBdbaXaOfydbgeah9hmbxdkkdndna9BcFeGcdSmbaDhexekdna8Fa8Ea8Ea9zfydbaDSEaXa9zfydbghcdtfydbgecu9hmbaXa9xfydbheka9na9zfaDBdbka9nahcdtfaeBdbka9Ace86bba9yce86bba8JIdwgRaUaUaR9DEhUa9vcefh9vcecda9BcFeGceSEa8Lfh8Lxeka9tcefh9tka8Mcefg8Ma39hmbkka9vTmddnalTmbcbhLcbhhindna9nahcdtgefydbgAahSmbaHaAcdtfydbh8AdnahaHaefydb9hg8JmbaIa8Ac8S2fgeaIahc8S2fgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya8NTmba8Na8Acltfgea8NahcltfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxkaaTmbagaAc8S2fgeagahc8S2g8MfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya9raA2hYa8RhOaahCinaOaYfgeaOaLfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8JmbJbbbbJbbjZaIa8MfgeIdygR:vaRJbbbb9BEaeIdwa8Ka8Acx2fgOIdwgRNaeIdzaOIdbg8VNaeIdaMg8Wa8WMMaRNaeIdlaOIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8VNaeIdxa8WNaeIdKMgRaRMMa8VNaeId8KMMM:lNgRa85a85aR9DEh85kaLa9rfhLahcefghal9hmbkcbhOa8EheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8EaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkcbhOa8FheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8FaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkka85aUaaEh85cbhOabhecbhAindnaHa9naeydbcdtfydbgLcdtfydbgCaHa9naeclfydbcdtfydbgYcdtfydbgQSmbaCaHa9naecwfydbcdtfydbg8AcdtfydbghSmbaQahSmbabaOcdtfgCaLBdbaCcwfa8ABdbaCclfaYBdbaOcifhOkaecxfheaAcifgAad6mbkdndnaSmbaOhdxekdnaOak0mbaOhdxekdna86a859FmbaOhdxekJFFuuh86cbhdabhecbhAindna9ia6aeydbgCcdtfydbcdtfIdbgRa859ETmbaeclf8Pdbh9CabadcdtfgQaCBdbaQclfa9C83dbaRa86a86aR9EEh86adcifhdkaecxfheaAcifgAaO6mbkkadak0mbxdkkascNefabadalaHz:cjjjbkdndnadak0mbadhYxekdnaSmbadhYxekdna86a879FmbadhYxekcehQina86Jbb;aZNgRa87aRa879DEh8WJbbbbhRdna9hTmba9ihea9hhOinaeIdbg8VaRa8Va8W9FEaRa8VaR9EEhRaeclfheaOcufgOmbkkJFFuuh86cbhYabhecbhOindna9ia6aeydbgAcdtfydbcdtfIdbg8Va8W9ETmbaeclf8Pdbh9CabaYcdtfgCaABdbaCclfa9C83dba8Va86a86a8V9EEh86aYcifhYkaecxfheaOcifgOad6mbkdnaQaYad9hVceGmbadhYxdkaRaUaUaR9DEhUaYak9nmecbhQaYhda86a879FmbkkdnamcjjjjdGTmba9ocbalz:xjjjbh8AdnaYTmbabheaYhOina8AaeydbgAfce86bba8AaHaAcdtfydbfce86bbaeclfheaOcufgOmbkkascNefabaYalaHz:cjjjbdndnalTmbcbhCindna8AaCfRbbTmbdna5aCfRbbPlbeebekdnaHaCcdtgLfydbgeaCSmba8KaCcx2fgOa8Kaecx2fgeydwBdwaOae8Pdb83dbxekaIaCc8S2fgQIdygnanJL:3;rUNgRMh87aQIdwgxaRMh8SaQIdlg9DaRMh8UaQIdbg9EaRMh81aQIdag9FaRa8KaCcx2fg8JIdwg88N:th8ZaQId3g9GaRa8JIdlg89N:th83aQIdKg9Ha8JIdbg8:aRN:th80JbbbbhZaQIdCg9IJbbbbMh85aQIdzg9JJbbbbMhBaQIdxg9KJbbbbMh86dndnaaTmbaChAinJbbbba87agaAc8S2fgOIdygR:vaRJbbbb9BEhRa8RaAaa2cltfheaOIdaa87Na8ZMh8ZaOId3a87Na83Mh83aOIdKa87Na80Mh80aOIdCa87Na85Mh85aOIdza87NaBMhBaOIdxa87Na86Mh86aOIdwa87Na8SMh8SaOIdla87Na8UMh8UaOIdba87Na81Mh81aahOina8ZaecwfIdbg8VaecxfIdbg8YNaRN:th8Za83aeclfIdbg8Wa8YNaRN:th83a85a8Wa8VNaRN:th85a81aeIdbg8Xa8XNaRN:th81a80a8Xa8YNaRN:th80aBa8Xa8VNaRN:thBa86a8Xa8WNaRN:th86a8Sa8Va8VNaRN:th8Sa8Ua8Wa8WNaRN:th8UaeczfheaOcufgOmbkaXaAcdtfydbgAaC9hmbka8NTmba8NaCcltfgeIdxhTaeIdwhcaeIdlhJaeIdbhRxekJbbbbhTJbbbbhcJbbbbhJJbbbbhRkaBa81:vg8Wa80Na8Z:ta85aBa86a81:vg8VN:tg8Za8Ua86a8VN:tg8Y:vg8Xa8Va80Na83:tg8UN:th83acaRa8WN:taJaRa8VN:tg86a8XN:tg85a8SaBa8WN:ta8Za8XN:tgB:vg8S:mh8Za86a8Y:vgc:mhJdnJbbbbaRaRa81:vg9eN:ta86acN:ta85a8SN:tg86:la87J:983:g81NgR9ETmba8Za83NaJa8UNa9ea80NaT:tMMa86:vhZka81:laR9ETmba8Y:laR9ETmbaB:laR9ETmba9e:maZNa8W:ma8ZaZNa83aB:vMgBNa8V:maJaZNa8X:maBNa8Ua8Y:vMMg85Na80:ma81:vMMMh87aKaLfgeclfydbgOaeydbge9RhhaEaecitfhLJbbbbhRdnaOaeSg8MmbJbbbbhRaLheahhAina8Kaeclfydbcx2fgOIdwa88:tg8Va8VNaOIdba8::tg8Va8VNaOIdla89:tg8Va8VNMMg8Va8Kaeydbcx2fgOIdwa88:tg8Wa8WNaOIdba8::tg8Wa8WNaOIdla89:tg8Wa8WNMMg8WaRaRa8W9DEgRaRa8V9DEhRaecwfheaAcufgAmbkaR:rgRaRNhRkaBa88:tg8Va8VNa87a8::tg8Va8VNa85a89:tg8Va8VNMMaR9EmbaQId8KhZdna8Mmbina8KaLclfydbcx2fgeIdba8KaLydbcx2fgOIdbg8W:tgRa89aOIdlg8X:tg80NaeIdla8X:tg8Va8:a8W:tg86N:tg8YaRa85a8X:tg8SNa8Va87a8W:tg8UN:tg8XNa8Va88aOIdwg81:tg8ZNaeIdwa81:tg8Wa80N:tg80a8VaBa81:tg83Na8Wa8SN:tg8VNa8Wa86NaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmdaLcwfhLahcufghmbkkJbbbbJbbjZan:vanJbbbb9BEgRaxaBNa9Ja87Na9FMg8Va8VMMaBNa9Da85Na9IaBNa9GMg8Va8VMMa85Na9Ea87Na9Ka85Na9HMg8Va8VMMa87NaZMMM:lNaRaxa88Na9Ja8:Na9FMg8Va8VMMa88Na9Da89Na9Ia88Na9GMg8Va8VMMa89Na9Ea8:Na9Ka89Na9HMg8Va8VMMa8:NaZMMM:lNJbb;aZNJ:983:g81M9Emba8JaBUdwa8Ja85Udla8Ja87UdbkaCcefgCal9hmbkdnaambcbhaxdkcbhQindna8AaQfRbbTmbaHaQcdtgefydbaQ9hmba5aQfhhaXaefh8Ja8KaQcx2fhAa8PaQaa2cdtfh8McbhEincuhCdnahRbbc99fcFeGce0mbaQhCa8JydbgeaQSmba8PaEcdtgOfhLa8MaOfIdbhRaQhCinaChOcuhCdnaLaeaa2cdtfIdbaR9CmbaOcuSmbaOhCagaec8S2fIdyagaOc8S2fIdy9ETmbaehCkaXaecdtfydbgeaQ9hmbkka8PaEcdtfhLa8RaEcltfhKaQheinaLaeaa2cdtfJbbbbJbbjZagaeaCaCcuSEgOc8S2fIdygR:vaRJbbbb9BEaKaOaa2cltfgOIdwaAIdwNaOIdbaAIdbNaOIdlaAIdlNMMaOIdxMNUdbaXaecdtfydbgeaQ9hmbkaEcefgEaa9hmbkkaQcefgQal9hmbxdkkaambcbhakaiavaoarawaaala8Ka8Pazasayasc1efa5a8Aaqz:hjjjbkdnamcjjjjlGTmbazmbaYTmbabhecbhLina5aeydbgAfRbbc3thQaecwfgXydbhHcjjjj94hCdna8EaAcdtgEfydbaeclfgKydbgOSmbcjjjj94cba8FaOcdtfydbaASEhCkaeaQaCVaAVBdba5aOfRbbc3thacjjjj94hCcjjjj94hQdna8EaOcdtfydbaHSmbcjjjj94cba8FaHcdtfydbaOSEhQkaKaaaQVaOVBdba5aHfRbbc3thOdna8EaHcdtfydbaASmbcjjjj94cba8FaEfydbaHSEhCkaXaOaCVaHVBdbaecxfheaLcifgLaY6mbkkdnazTmbaYTmbaYheinabazabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPa9paU:rNUdbkdnasyd;8egHTmbaHcdtasc:Ceffc98fheinaeydbcbyd;C:L:cjbH:bjjjbbaec98fheaHcufgHmbkkascj;sbf8KjjjjbaYk;Yieouabydlhvabydbclfcbaicdtz:xjjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd;y:L:cjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:xjjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd;C:L:cjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkabclfhbawclfhwaiaDcefgD9hmbkkk;:odvuv998Jjjjjbca9Rgocbyd1:G:cjbBdKaocb8Pdj:G:cjb83izaocbydN:G:cjbBdwaocb8Pd:m:G:cjb83ibdnadTmbaicd4hrdnabmbdnalTmbcbhwinaealawcdtfydbar2cdtfhDcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxikkarcdthwcbhDincbhiinaoczfaifgqaeaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaeawfheaDcefgDad9hmbxdkkdnalTmbcbhwinabawcx2fgiaealawcdtfydbar2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxdkkarcdthlcbhwaehDinabawcx2fgiaeawar2cdtfgqIdbUdbaiaqIdlUdlaiaqIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaDalfhDawcefgwad9hmbkkJbbbbaoIdbaoIdzgx:tgkakJbbbb9DEgkaoIdlaoIdCgm:tgPaPak9DEgkaoIdwaoIdKgP:tgsasak9DEhsdnabTmbadTmbJbbbbJbbjZas:vasJbbbb9BEhkinabakabIdbax:tNUdbabclfgoakaoIdbam:tNUdbabcwfgoakaoIdbaP:tNUdbabcxfhbadcufgdmbkkdnavTmbavaPUdwavamUdlavaxUdbkask:WlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvyd:G:G:cjbcdtfydbcdtfydbhodnalawavfydbcdtfydbgqabaqcdtfgkydbgvSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnaoabaocdtfgkydbgvSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnaxabavfgDydbgvSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhkabhvcbhoindndnaoalydbgq9hmbdnaoavydbgq9hmbavakBdbakcefhkxdkavabaqcdtfydbBdbxekavabaqcdtfydbBdbkalclfhlavclfhvaeaocefgo9hmbkakk;jiilud99euabcbaecltz:xjjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakaqakIdlMUdlakaDakIdwMUdwakakIdxJbbjZMUdxaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhkaehrinakcxfgoIdbhDaocbBdbakakIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbakclfgoaDaoIdbNUdbakcwfgoaDaoIdbNUdbakczfhkarcufgrmbkkdnalTmbinavadydbcltfgkaicwfIdbakIdw:tgDaDNaiIdbakIdb:tgDaDNaiclfIdbakIdl:tgDaDNMMgDakIdxgqaqaD9DEUdxadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhkinabakIdbUdbakczfhkabclfhbaecufgembkkk:moerudnaoTmbaecd4hzdnavTmbaicd4hHavcdthOcbhAindnaPaAfRbbTmbaAhednaDTmbaDaAcdtfydbhekdnasTmbasaefRbbceGmekdnamaAfRbbcvSmbabaeaz2cdtfgiaraAcx2fgCIdbakNaxIdbMUdbaiaCIdlakNaxIdlMUdlaiaCIdwakNaxIdwMUdwkadaeaH2cdtfhXaqheawhiavhCinaXaeydbcdtgQfaiIdbalaQfIdb:vUdbaeclfheaiclfhiaCcufgCmbkkawaOfhwaAcefgAao9hmbxdkkdnasmbcbheaDhiindnaPaefRbbTmbaehCdnaDTmbaiydbhCkamaefRbbcvSmbabaCaz2cdtfgCarIdbakNaxIdbMUdbaCarclfIdbakNaxIdlMUdlaCarcwfIdbakNaxIdwMUdwkaiclfhiarcxfhraoaecefge9hmbxdkkdnaDTmbindnaPRbbTmbasaDydbgefRbbceGmbamRbbcvSmbabaeaz2cdtfgearIdbakNaxIdbMUdbaearclfIdbakNaxIdlMUdlaearcwfIdbakNaxIdwMUdwkaPcefhPaDclfhDamcefhmarcxfhraocufgombxdkkazcdthicbheindnaPaefRbbTmbasaefRbbceGmbamaefRbbcvSmbabarIdbakNaxIdbMUdbabclfarclfIdbakNaxIdlMUdbabcwfarcwfIdbakNaxIdwMUdbkarcxfhrabaifhbaoaecefge9hmbkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbkRbababaeadaialavaoarawaDaqakaxcjjjjdVamz:bjjjbk:vgoque99due99duq998Jjjjjbc;Wb9Rgq8Kjjjjbcbhkaqcxfcbc;Kbz:xjjjb8Aaqcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgxBdxaqceBd2axaialavcbcbz:ejjjb8AaqcualcdtalcFFFFi0Egmcbyd;y:L:cjbHjjjjbbgiBdzaqcdBd2dndnJFF959eJbbjZawJbbjZawJbbjZ9DE:vawJ9VO:d869DEgw:lJbbb9p9DTmbaw:OhPxekcjjjj94hPkadci9Uhsarco9UhzdndnaombaPcd9imekdnalTmbaPcuf:YhwdnaoTmbcbhvaihHaxhOindndnaoavfRbbceGTmbavcjjjjlVhAxekdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHaOcxfhOalavcefgv9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkadTmbcbhkaehvcbhOinakaiavclfydbcdtfydbgHaiavcwfydbcdtfydbgA9haiavydbcdtfydbgXaH9haXaA9hGGfhkavcxfhvaOcifgOad6mbkkarci9UhQdndnaz:Z:rJbbbZMgw:lJbbb9p9DTmbaw:Ohvxekcjjjj94hvkaQ:ZhLcbhKc:bwhzdninakaQ9pmeazaP9Rcd9imeavazcufgOavaO9iEaPcefavaP9kEhYdnalTmbaYcuf:YhwdnaoTmbcbhOaihHaxhvindndnaoaOfRbbceGTmbaOcjjjjlVhAxekdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHavcxfhvalaOcefgO9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkcbhOdnadTmbaehvcbhHinaOaiavclfydbcdtfydbgAaiavcwfydbcdtfydbgX9haiavydbcdtfydbgraA9haraX9hGGfhOavcxfhvaHcifgHad6mbkkdnas:ZgCaL:taY:Ygwaz:Y:tg8ANak:ZgEaO:Zg3:tNaEaL:tawaP:Y:tg5Na3aC:tNMg8EJbbbb9BmbaCaE:ta5a8Aa3aL:tNNNa8E:vawMhwkdndnaOaQ0mbaOhkaYhPxekaOhsaYhzkdndnaKcl0mbdnawJbbbZMgw:lJbbb9p9DTmbaw:Ohvxdkcjjjj94hvxekaPazfcd9ThvkaKcefgKcs9hmbkkdndndnakmbJbbjZhwcbhOcdhvaDmexdkalcd4alfhHcehOinaOgvcethOavaH6mbkaqcuavcdtavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgYBdCaqciBd2aqamcbyd;y:L:cjbHjjjjbbgzBdKaqclBd2dnalTmbaPcuf:YhwdnaoTmbcbhOaihAaxhHindndnaoaOfRbbceGTmbaOcjjjjlVhXxekdndnaHclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqthXdndnaHcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarVhXdndnaHIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarcCtVhXkaAaXBdbaAclfhAaHcxfhHalaOcefgO9hmbxdkkaxhOaihHalhAindndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcCthXdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkarcqtaXVhXdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaHaXarVBdbaOcxfhOaHclfhHaAcufgAmbkkaqcuaYavazaialz:mjjjbgXc8S2gvaXc;D;O;f8U0Ecbyd;y:L:cjbHjjjjbbgiBd3aqcvBd2aicbavz:xjjjbhOdnadTmbcbhraehiinaxaiclfydbgocx2fgvIdbaxaiydbgPcx2fgHIdbg3:tgCaxaicwfydbgYcx2fgAIdlaHIdlg8A:tgwNavIdla8A:tgEaAIdba3:tg8EN:tgLaLNaEaAIdwaHIdwg5:tg8FNavIdwa5:tgEawN:tgwawNaEa8ENaCa8FN:tgCaCNMMg8E:rhEJbbnnJbbjZazaPcdtfydbgvazaocdtfydbgASavazaYcdtfydbgoSGgHEh8Fdna8EJbbbb9ETmbaLaE:vhLaCaE:vhCawaE:vhwkaOavc8S2fgvavIdbawa8FaE:rNgEawNNg8FMUdbavaCaEaCNgaNghavIdlMUdlavaLaEaLNg8ENggavIdwMUdwavawaaNgaavIdxMUdxava8EawNg8JavIdzMUdzavaCa8ENg8EavIdCMUdCavawaEaLa5Nawa3Na8AaCNMM:mg8ANg3NgwavIdKMUdKavaCa3NgCavId3MUd3avaLa3NgLavIdaMUdaava3a8ANg3avId8KMUd8KavaEavIdyMUdydnaHmbaOaAc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdyaOaoc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdykaicxfhiarcifgrad6mbkkcbhAaqcuaXcdtgvaXcFFFFi0Egicbyd;y:L:cjbHjjjjbbgHBdaaqcoBd2aqaicbyd;y:L:cjbHjjjjbbgiBd8KaqcrBd2aHcFeavz:xjjjbhPdnalTmbazhHinJbbbbJbbjZaOaHydbgrc8S2fgvIdygw:vawJbbbb9BEavIdwaxcwfIdbgwNavIdzaxIdbgCNavIdaMgLaLMMawNavIdlaxclfIdbgLNavIdCawNavId3MgwawMMaLNavIdbaCNavIdxaLNavIdKMgwawMMaCNavId8KMMM:lNhwdndnaParcdtgvfgrydbcuSmbaiavfIdbaw9ETmekaraABdbaiavfawUdbkaHclfhHaxcxfhxalaAcefgA9hmbkkdndnaXmbJbbbbhwxekJbbbbhwinaiIdbgCawawaC9DEhwaiclfhiaXcufgXmbkaw:rhwkakcd4akfhOcehiinaigvcethiavaO6mbkcbhOaqcuavcdtgiavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgHBdyaHcFeaiz:xjjjbhXdnadTmbavcufhrcbhkcbhxindnazaeaxcdtfgvydbcdtfydbgiazavclfydbcdtfydbgOSmbaiazavcwfydbcdtfydbgvSmbaOavSmbaPavcdtfydbhAdndnaPaOcdtfydbgvaPaicdtfydbgi9pmbavaA9pmbaAhlaihoavhAxekdnaAai9pmbaAav9pmbaihlavhoxekavhlaAhoaihAkabakcx2fgvaABdbavcwfaoBdbavclfalBdbdnaXaoc:3F;N8N2alc:F:b:DD27aAc;D;O:B8J27arGgOcdtfgvydbgicuSmbcehHinaHhvdnabaicx2fgiydbaA9hmbaiydlal9hmbaiydwaoSmikavcefhHaXaOavfarGgOcdtfgvydbgicu9hmbkkavakBdbakcefhkkaxcifgxad6mbkakci2hOkcwhvaDTmekaDawUdbkavcdthvaqcxfc98fhiinaiavfydbcbyd;C:L:cjbH:bjjjbbavc98fgvmbkaqc;Wbf8KjjjjbaOk:0iewuabcFeaecdtz:xjjjbhbdnalmbcbskaecufhvdndnaiTmbcbhocbhrindndndnabaiarcdtgwfydbgDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbceheinaiaxcdtgxfydbaDSmdaqaefhxaecefheabaxavGgqcdtfgkydbgxcu9hmbkkakarBdbaoheaocefhoxekadaxfydbhekadawfaeBdbarcefgral9hmbxdkkcbhocbhDindnabaDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbaxaDSmbceheinabaqaefavGgqcdtfgkydbgxcuSmeaecefheaxaD9hmbkkdndnaxcu9hmbakaDBdbaoheaocefhoxekadaxcdtfydbhekadaDcdtfaeBdbaDcefgDal9hmbkkaok:3ldrue9:8Jjjjjbc;Wb9Rgr8Kjjjjbcbhwarcxfcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkarcualcdtalcFFFFi0EgDcbyd;y:L:cjbHjjjjbbgqBdxarceBd2aqcbaialavcbarcxfz:djjjbcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbhkarcxfaryd2gxcdtfakBdbaraxcefgmBd2akaialavcbcbz:ejjjb8AarcxfamcdtfaDcbyd;y:L:cjbHjjjjbbgiBdbaraxcdfgvBd2arcxfavcdtfcuaialaeadaqz:fjjjbgecltaecjjjjiGEcbyd;y:L:cjbHjjjjbbgqBdbaqaeaiakalz:gjjjbaxcifhkdnadTmbaoaoNhocbhwabhlcbheindnaqaialydbgvcdtfydbcdtfIdbao9ETmbalclf8PdbhPabawcdtfgDavBdbaDclfaP83dbawcifhwkalcxfhlaecifgead6mbkkdnakTmbaxcdtarcxffcwfhlinalydbcbyd;C:L:cjbH:bjjjbbalc98fhlakcufgkmbkkarc;Wbf8Kjjjjbawk;lOoDud99oue99vuv998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:xjjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgqBdxawceBd2aqaeadaicbcbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd;y:L:cjbHjjjjbbgxBdzawcdBd2adcd4adfhecehiinaigmcethiamae6mbkcbhPawcuamcdtgsamcFFFFi0Ecbyd;y:L:cjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohixekcjjjj94hikamcufhAc:bwhCcbhXadhQcbhLinaiaCcufgeaiae9iEaPcefaiaP9kEhDdndnadTmbaDcuf:YhOaqhiaxheadhKindndnaiIdbaONJbbbZMgY:lJbbb9p9DTmbaY:Oh8Axekcjjjj94h8Aka8AcCth8AdndnaiclfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaEcqta8AVh8AdndnaicwfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaea8AaEVBdbaicxfhiaeclfheaKcufgKmbkazcFeasz:xjjjbh3cbh5cbh8Eindna3axa8Ecdtfydbg8Acm4a8A7c:v;t;h;Ev2gics4ai7aAGgKcdtfgEydbgecuSmbaea8ASmbcehiina3aKaifaAGgKcdtfgEydbgecuSmeaicefhiaea8A9hmbkkaEa8ABdba5aecuSfh5a8Ecefg8Ead9hmbxdkkazcFeasz:xjjjb8Acbh5kdnaQ:ZgYaH:taD:YgOaC:Y:tg8FNaX:Zgaa5:Zgh:tNaaaH:taOaP:Y:tggNahaY:tNMg8JJbbbb9BmbaYaa:taga8FahaH:tNNNa8J:vaOMhOkaPaDa5ar0geEhPaXa5aeEhXdna5arSmbaDaCaeEgCaP9Rcd9imbdndnaLcl0mbdnaOJbbbZMgO:lJbbb9p9DTmbaO:Ohixdkcjjjj94hixekaPaCfcd9Thika5aQaeEhQaLcefgLcs9hmekkdndnaXmbcihicbhDxekawakcbyd;y:L:cjbHjjjjbbg8ABdKawclBd2aPcuf:YhYdnadTmbaqhiaxheadhKindndnaiIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaEcCthEdndnaiclfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3ka3cqtaEVhEdndnaicwfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3kaeaEa3VBdbaicxfhiaeclfheaKcufgKmbkkawcuazama8Aaxadz:mjjjbgDc32giaDc;j:KM;jb0Ecbyd;y:L:cjbHjjjjbbgeBd3awcvBd2aecbaiz:xjjjbh3avcd4hxdnadTmbdnalTmbaxcdth8Ea8AhEaqhealhKadhAina3aEydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaKIdbaiIdxMUdxaiaKclfIdbaiIdzMUdzaiaKcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaEclfhEaecxfheaKa8EfhKaAcufgAmbxdkka8AhKaqheadhEina3aKydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKaKclfhKaecxfheaEcufgEmbkkdnaDTmba3hiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgKaOaKIdbNUdbaicwfgKaOaKIdbNUdbaicxfgKaOaKIdbNUdbaiczfgKaOaKIdbNUdbaicCfgKaOaKIdbNUdbaic3fhiaecufgembkkcbhEawcuaDcdtgCaDcFFFFi0Egicbyd;y:L:cjbHjjjjbbgeBdaawcoBd2awaicbyd;y:L:cjbHjjjjbbg8EBd8KaecFeaCz:xjjjbh5dnadTmbaoJbbjZJbbjZaY:vaPceSENgOaONhYaxcdthxalheinaYaecN:H:cjbalEgKIdwa3a8AydbgAc32fgiIdC:tgOaONaKIdbaiIdx:tgOaONaKIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndna5aAcdtgifgKydbcuSmba8EaifIdbaO9ETmekaKaEBdba8EaifaOUdbka8Aclfh8AaqcxfhqaeaxfheadaEcefgE9hmbkkaba5aCz:wjjjb8Acrhikaicdthiawcxfc98fheinaeaifydbcbyd;C:L:cjbH:bjjjbbaic98fgimbkkawc;Wbf8KjjjjbaDk:Pdidui99ducbhi8Jjjjjbca9Rglcbyd1:G:cjbBdKalcb8Pdj:G:cjb83izalcbydN:G:cjbBdwalcb8Pd:m:G:cjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk:H8Modui99lud99Aus998Jjjjjbcji9RgD8KjjjjbcbhqaDcxfcbc;Kbz:xjjjb8AaDcbBdwaD9cb83ibaDcbyd;i:L:cjbBd1eaDcb8Pd;a:L:cjb83ijeaDcbyd;u:L:cjbBd94aDcb8Pd;m:L:cjb83i9WdndnavmbJbbjFhkJbbjFhxJbbjFhmxekaocd4cdthPalhsincbhzinaDcjefazfgHasazfIdbgkaHIdbgxaxak9EEUdbaDc;WbfazfgHakaHIdbgxaxak9DEUdbazclfgzcx9hmbkasaPfhsaqcefgqav9hmbkaDId94aDId1e:thmaDIdtaDId:ee:thxaDId9WaDIdje:thkkJbbbbhOdnar:YgAJq;x8J88MaA:vJbbbbakakJbbbb9DEgkaxaxak9DEgkamamak9DENgxJbbbb9Bmbarc9:f:Yax:vhOkaDcCfhCaDcxfcxfhXcbhzinaDazfaDcjefazfIdbgkaxaDc;WbfazfIdbak:t:tJbbb:;NMUdbazclfgzcx9hmbkcbhQaDarar2gLar2gzcbyd;y:L:cjbHjjjjbbgHBdxaDceBd2aHcbazz:xjjjbgKcbcbadaialaoaraOaDawz:rjjjbcdhYaDcuaLcdtaLcFFFFi0Eg8Acbyd;y:L:cjbHjjjjbbgEBdzaDcdBd2aDcjefcbarz:xjjjb8Acbh3dnaLTmbdnarcb9kmbaKhzaEhHaLhsincbh3aHcbcuazaDcjefarz:AjjjbEBdbazarfhzaHclfhHascufgsmbxdkkaKhPcbh3cbhvindndnaKavar2faDcjefarz:AjjjbTmbcbhHaPhzarhsinazaHazRbbgqfgHcbaqE86bbazcefhzascufgsmbkaEavcdtfa3BdbaHa3fh3xekaEavcdtfcuBdbkaParfhPavcefgvaL9hmbkkdnabTmbaDcua3cotgza3cFFF8F0Ecbyd;y:L:cjbHjjjjbbgQBdCcihYaDciBd2aQcbazz:xjjjb8AaXhCkdnawceGmbaCa8Acbyd;y:L:cjbHjjjjbbg5BdbaDaYcefgzBd2aDcxfazcdtfaLcbyd;y:L:cjbHjjjjbbgzBdbaDaYcdfgYBd2azcbaLz:xjjjbh8EarcufhXdnarci9imbarc9:fhCararcef2aKfcefh8Aceh8Fina8Far2hPa8AhvcehqindnaEaqaPfcdtfydbcuSmbavhzaChHinazazRbbgscuasE86bbazcefhzaHcufgHmbkkavarfhvaqcefgqaX9hmbka8AaLfh8Aa8Fcefg8FaX9hmbkkarce9imbcbh8Acbhqcbhvina8EaqfhscbhzindnasazfgHRbbmbaHce86bba5a8AcdtfaqazfBdba8Acefh8Akarazcefgz9hmbkaqarfhqavcefgvar9hmbka8ATmbaKcefhaaKc9:fhharc9:fhgarci9ih8Jina8Ea5a8Acufg8Acdtfydbgvfcb86bbavar2hPdna8JmbaEavcdtfydbcuSmbaKaPfhHaghqindnaHcefgzRbbgscFe9hmbaHRbbmbcbhskazas86bbazhHaqcufgqmbkaharavcef2fhzaXhsindnazRbbgHcFe9hmbazcefRbbmbcbhHkazaH86bbazcufhzascufgsce9kmbkkaaaPfh8Kavavar9Ug8Lar29Rh8FcbhCindnaCceScuaCEa8Ffgzce9imbazaX9ombcuaCciSaCcdSEa8LfgHce9imbaHaX9ombaEaHar2azfg8McdtfydbcuSmba8Jmbaaa8Mar2fhzcbhqa8KhsaghvinazazRbbgHcbaHaHcFeSEasRbbEgP86bbascefhsazcefhzaPaH7aqVhqavcufgvmbkaqcFeGTmba8Ea8MfgzRbbmbazce86bba5a8Acdtfa8MBdba8Acefh8AkaCcefgCcl9hmbka8AmbkkdnaQTmbaKaEaQadaialaoaraOaDawz:rjjjba3TmbJbbjZaO:vhkawcjjjjlGhPdnawcdGTmbJbbnnaOaON:vh8NakJbbbZNhyaQhzinazczfgsIdbg8PazcCfIdbgx:vhmazcxfgqIdbgIax:vhAazcwfgvIdbg8Rax:vh8SakazydbgHcFrG:ZNhRakaHcq4cFrG:ZNh8UakaHcC4cFrG:ZNh8VdnaxJ:p;c;188Ng8WazcKfIdbMg8X:laxJ:983:g81Ngx9ETmba8Wazc3fIdbMazc8KfIdbg8Ya8Ya8X:vg8YN:tg8Z:lax9ETmba8WazcafIdbMazcyfIdbg8Wa8Wa8X:vg80N:tazc8SfIdba8Wa8YN:tg8Wa8Wa8Z:vg8WN:tg81:lax9ETmba8PJ:p;c;188NazcUfIdb:ta80a8RJ:p;c;188Nazc8WfIdb:tg8PN:ta8WaIJ:p;c;188Nazc80fIdb:ta8Ya8PN:tgIN:ta81:vgxam:tg8Ra8RNa8Pa8X:va8YaIa8Z:va8WaxN:tg8XN:ta80axN:tg8Wa8S:tg8Ya8YNa8XaA:tg8Ya8YNMMa8N9DTmbaxaRaxaR9EEgxakaRMgmaxam9DEhma8Xa8Ua8Xa8U9EEgxaka8UMgAaxaA9DEhAa8Wa8Va8Wa8V9EEgxaka8VMg8Saxa8S9DEh8SkdnaPTmbayaRMhmaya8UMhAaya8VMh8SkasamUdbaqaAUdbava8SUdbazc;abfhza3cufg3mbxdkkdnaPTmbakJbbbZNhxaQhzinazczfaxakazydbgHcFrG:ZNMUdbazcxfaxakaHcq4cFrG:ZNMUdbazcwfaxakaHcC4cFrG:ZNMUdbazc;abfhza3cufg3mbxdkkaQcCfhzinazc98fgHaHIdbazIdbgk:vUdbazc94fgHaHIdbak:vUdbazctfgHaHIdbak:vUdbazc;abfhza3cufg3mbkkcbhsdndnarcd9imbarcufh3aEarcdtfhadnabmbaKcefg8Mararcefgz2fh8JaKazfhba8MaLfh8Ecbhscbh8Kina8Kar2h8La8Mheabh8Aa8Eh8Fa8Jh5cbhXindnaEaXa8LfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbclcbaKaqar2fgzarfRbbEazRbbcb9hVczcbazaLfgzRbbEVc;abcbazarfRbbEVhPaehza8AhHa8Fhqa5hva3hQindnaPclcbaHRbbEazRbbcb9hVczcbaqRbbEVc;abcbavRbbEVgPcetVgCTmbaCcFeSmbasaCRb;W;p:cjbfhskazcefhzaHcefhHaqcefhqavcefhvaQcufgQmbkkaearfhea8Aarfh8Aa8Farfh8Fa5arfh5aXcefgXa39hmbka8MaLfh8MabaLfhba8EaLfh8Ea8JaLfh8Ja8Kcefg8Ka39hmbxdkkJbbjZaO:vgkakJk;x8J88NNh8RawcdGh8EaDIdwhkaDIdlhxaDIdbhmcbhscbhPinaPar2h8KcbhvindnaEava8KfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbcbh8AclcbaKaqar2fgYarfRbbEaYRbbcb9hVczcbaYaLfg8JRbbEVc;abcba8JarfRbbEVh8Lindna8LclcbaYa8Ag8Mcefg8AfgzarfRbbEazRbbcb9hVczcba8Ja8AfgzRbbEVc;abcbazarfRbbEVg8LcetVgCTmbaCcFeSmbcbhqdndndnaCRb;W;n:cjbcufPdebdka8ETmeaCcC2gz8Ve;W:L:cjbcltaz8Ve;Y:L:cjbcsGVh8FaKa8Mfh5cxhzaDcjefhHinaHaQaEa8Faz4gqce4ceGavfaqcd4ceGaPfar2fgXcdtfydbcotfa5aqceGfaXar2fRbbcotfcnfBdbaHclfhHazc98fgzc989hmbkaDydjegzIdyaDyd:megHIdyMaDyd:eegqIdyaDyd1egXIdyMMg8XaqIdwaXIdwMJbbbZNgANazIdUaHIdUMaqIdUaXIdUMMg8WMg8Sa8SMazIdaaHIdaMaqIdaaXIdaMMg8YaqIdzaXIdzMJbbbZNg8SNMa8SNazId8SaHId8SMaqId8SaXId8SMMgRa8SNazId80aHId80MaqId80aXId80MMg8UMg8Sa8SMazId3aHId3MaqId3aXId3MMg8VaqIdxaXIdxMJbbbZNg8SNMa8SNazId8KaHId8KMaqId8KaXId8KMMg8Za8SNazId8WaHId8WMaqId8WaXId8WMMg80Mg8Sa8SMazIdKaHIdKMaqIdKaXIdKMMgyaANMaANazId88aHId88MaqId88aXId88MMg8PMMM:lgIa8RazIdCaHIdCMaqIdCaXIdCMMN9Ea8XazIdwaHIdwMJbbbZNgANa8WMg8Sa8SMa8YazIdzaHIdzMJbbbZNg8SNMa8SNaRa8SNa8UMg8Sa8SMa8VazIdxaHIdxMJbbbZNg8SNMa8SNa8Za8SNa80Mg8Sa8SMayaANMaANa8PMMM:laIJ;d;1UZN9DGhqxekaKa8Mfh8FcbhzcrhHindnaCaz4ceGTmba8FazceGfazce4ceGavfazcd4aPfar2fgqar2fRbbgXcFeSmbaQaEaqcdtfydbcotfaXcotfc9efRbbaH4ceGTmbcbhqxdkaHcufhHcehqazcefgzcw9hmbkkaCcC2aqcq2fgH8Ve;W:L:cjbgzTmbaHc;Y:L:cjbfhqaKa8MfhCabasc8K2fhHindnasae9pmbaHaQaEazcD4ceGavfazcq4ceGaPfar2fgXcdtfydbcotfaCazcw4ceGfaXar2fRbbcotfgXc9ifIdbamMUdbaHclfaXc9mfIdbaxMUdbaHcwfaXc9qfIdbakMUdbaHcxfamaQaEazcv4ceGavfazco4ceGaPfar2fgXcdtfydbcotfaCazcl4ceGfaXar2fRbbcotfgXc9ifIdbMUdbaHczfaxaXc9mfIdbMUdbaHcCfakaXc9qfIdbMUdbaHcKfamaQaEazce4ceGavfazcd4ceGaPfar2fgXcdtfydbcotfaCazceGfaXar2fRbbcotfgzc9ifIdbMUdbaHc3faxazc9mfIdbMUdbaHcafakazc9qfIdbMUdbkaHc8KfhHascefhsaq8Vebhzaqcdfhqazmbkka8Aa39hmbkkavcefgva39hmbkaPcefgPa39hmbkaDyd2gYTmekaYcdtaDcxffc98fhzinazydbcbyd;C:L:cjbH:bjjjbbazc98fhzaYcufgYmbkkaDcjif8Kjjjjbask;Kxmiue99due99euz99eui99eud99dud99oudnalTmbaocd4hkaqcdGhxarc99fhqarcethmawawMhPcbhsindndnawavaiascdtfgoclfydbak2cdtfgzIdwgHavaoydbak2cdtfgOIdwgA:tgCaCNazIdbgXaOIdbgQ:tgLaLNazIdlgKaOIdlgY:tg8Aa8ANMMgEavaocwfydbak2cdtfgoIdwg3aA:tg5a5NaoIdbg8EaQ:tg8Fa8FNaoIdlgaaY:tghahNMMggaEag9EEgEa3aH:tgHaHNa8EaX:tgHaHNaaaK:tgHaHNMMgHaEaH9EE:rNgHaHMgH:lJbbb9p9DTmbaH:Ohoxekcjjjj94hokdnaLahNa8Aa8FN:tgHaHNa8Aa5NaCahN:tgXaXNaCa8FNaLa5N:tgKaKNMMg3Jbbbb9BmbJbbjZhEdnaoceaoce9kEgoamaoam9iEg8Jcd9imbJbbjZa8J:Z:vhEkarcb9imbaAaDIdw:th8KaYaDIdl:th8LaQaDIdb:th8Ma8Jcba8Jcb9kEh8NdnadTmbaHJbbjZa3:rgA:vgQNg3aAa8Jcefa8Jcdf2:Y:vgANh8EaKaQNgKaANhyaXaQNgXaXaANNh8PcbhIina8Jcba8Jcb9kEcefh8RaEaI:ZNgQaCNa8KMhgaQa8ANa8LMh8SaQaLNa8MMhRcbhzindndnaPaEaz:ZNgQahNa8SMgYNgH:lJbbb9p9DTmbaH:OhOxekcjjjj94hOkaOce91goaqaoaq6Eh8UdndnaPaQa5NagMgHNga:lJbbb9p9DTmbaa:Oh8Vxekcjjjj94h8Vka8Ua8Vce91goaqaoaq6Eg8Wcefar2fcefgoar2h8XdndnaPaQa8FNaRMgQNga:lJbbb9p9DTmbaa:Oh8Yxekcjjjj94h8Ykadaeaocdtfydbcotfaba8Yce91goaqaoaq6Eg8Zfa8XfcefRbbcotfgocnfa8Ucqta8ZcCtVa8WVBdbaoc9efg8Ua8URbbcea8YceGaOcetcdGVa8VcdtclGVtV86bbaoc9ifgOaQaANaOIdbMUdbaoc9mfgOaYaANaOIdbMUdbaoc9qfgOaHaANaOIdbMUdbaoc9ufgOaAaOIdbMUdbdnaxTmbaoc9yfgOa8PaOIdbMUdbaoc9CfgOaKayNaOIdbMUdbaoc9GfgOa3a8ENaOIdbMUdbaoc9KfgOaXayNaOIdbMUdbaoc9OfgOaXa8ENaOIdbMUdbaoc2fgOaKa8ENaOIdbMUdbaoc9WfgOaXaAa3aHNaXaQNaKaYNMMgY:mNgQNaOIdbMUdbaoctfgOaKaQNaOIdbMUdbaoc94fgOa3aQNaOIdbMUdbaoc98fgoaoIdbaYaQN:tUdbka8Razcefgz9hmbka8Jcufh8JaIa8NShoaIcefhIaoTmbxdkkcbh8Vina8Jcba8Jcb9kEcefh8UaEa8V:ZNgAaCNa8KMhYaAa8ANa8LMhHaAaLNa8MMhXcbhoindndnaPaEao:ZNgAahNaHMNgQ:lJbbb9p9DTmbaQ:Ohzxekcjjjj94hzkazce91gzaqazaq6EhzdndnaPaAa5NaYMNgQ:lJbbb9p9DTmbaQ:OhOxekcjjjj94hOkazaOce91gOaqaOaq6Ecefar2fcefar2hzdndnaPaAa8FNaXMNgA:lJbbb9p9DTmbaA:OhOxekcjjjj94hOkabaOce91gOaqaOaq6Efazfcefce86bba8Uaocefgo9hmbka8Jcufh8Ja8Va8NShoa8Vcefh8VaoTmbkkascifgsal6mbkkk:Nvezu8Jjjjjbcjd9Rgb8Kjjjjbcbheabcbcjdz:xjjjbhdc:W:H:cjbhbinabRbbgicC2glabcqf8Veb87e;4:L:cjbalabcdfgv8Peb83e;W:L:cjbaiabcefRbb86b;W;n:cjbadaifce86bbalavabcxfceaetc:F:d;avGEgi8Peb83e;6:L:cjbalai8Vew87e:c:M:cjbabcQfhbaecefgecK9hmbkcbhoinc;Y:L:cjbhrcbhvindnadavfgwRbbce9hmbavcC2c;W:L:cjbfhDcbhbcehqavc;W;n:cjbfhkinabcitc:G:H:cjbfhlcbhbcbheinaeavab4ceGalabfRbbtVheabcefgbcw9hmbkdnadaecFeGgxfgmRbbmbaxcC2c;W:L:cjbfhPcbhbcehsindnaDabcq2gif8VebgbTmbaraifheaPaifhiinaialabcl4csGfRbbcltalabcw4csGfRbbcwtValabcsGfRbbV87ebaicdfhiae8VebhbaecdfheabmbkkcehbasceGhecbhsaembkamce86bbaxakRbb86b;W;n:cjbkcehbaqceGhlcbhqalmbkawcd86bbkarcCfhravcefgvcjd9hmbkaocefgoci9hmbkcbhic;W:L:cjbhvincuhlavhbinalcefhlab8Vebheabcdfhbaembkaial86b;W;p:cjbavcCfhvaicefgicjd9hmbkadcjdf8Kjjjjbk9DeeuabcFeaicdtz:xjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk;Bidqui998Jjjjjbc;Wb9Rgl8Kjjjjbalcxfcbc;Kbz:xjjjb8Aadcd4adfhvcehoinaogrcethoarav6mbkalcuarcdtgoarcFFFFi0Ecbyd;y:L:cjbHjjjjbbgvBdxavcFeaoz:xjjjbhwdnadTmbaicd4hDarcufhqcbhkindndnawcbaeakaD2cdtfgrydlgiaicjjjj94SEgocH4ao7c:F:b:DD2cbarydbgxaxcjjjj94SEgocH4ao7c;D;O:B8J27cbarydwgmamcjjjj94SEgrcH4ar7c:3F;N8N27aqGgvcdtfgrydbgocuSmbam::hPai::hsax::hzcehiinaihrdnaeaoaD2cdtfgiIdbaz9CmbaiIdlas9CmbaiIdwaP9BmikarcefhiawavarfaqGgvcdtfgrydbgocu9hmbkkarakBdbakhokabakcdtfaoBdbakcefgkad9hmbkkalydxcbyd;C:L:cjbH:bjjjbbalc;Wbf8Kjjjjbk9teiucbcbyd;G:L:cjbgeabcifc98GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;G:L:cjbgeabcrfc94GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikTeeucbabcbyd;G:L:cjbge9Rcifc98GaefgbBd;G:L:cjbdnabZbcztge9nmbabae9RcFFifcz4nb8Akk6eiucbhidnadTmbdninabRbbglaeRbbgv9hmeaecefheabcefhbadcufgdmbxdkkalav9Rhikaikk;0vdbcj:Gdk;yvFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeeebebbeebbebbebbbeeebbbbebbbbbbbbbbbbbbbbbbbeeeeeeebebbbeeebbeebbbbbebbbbbebebbbbbbbbbbbbbbbdiorbelvlbodveribbbbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbibbbbbbbbbbbbbbbbbbbbbobbbbbbbbbbbbbbbbbbbbbrbaebbbbbbbbbbbbbbbbbbsd8We8YbbbbbbbhiaebbbbbbQe8Ke9cebbbbbbbbbbbbbbbbLb8KebbbbbbbbbbbbbbbbbbKbbbbbbbbbbbbbbbbbbbbbYeJbilbbbbbbbbbbbbbbbbEe80e8WlbbbbbbzlAbbbbbbb5eJdnibbbbbbai8Kbbbbbbb8Ee9ce8Ylcibbbb8Yebbbbbbbb8FdOlAdbbbbbb80e8Ylbbbbbb88eTi8KiJv8Jlbbbbbbbbbbbb89e9td8Kv9qibbbbndlvaibbbbZd8Li8KvbbbbbbJdTibbbbbb9Pe81b9GvoiBvbbbbbbbbbbbb9Re9JbvoWibbbbvibbbbbbbb9VeWi9Gvbbbbbb8WvBbbbbbbb9:b9ceBvbbbbbbbbbbbbbbbbubWibbbbbbbbbbbbbbbbbb;Wd9hvSrbbbbbbWl9NvbbbbbbFbbbbbbbbbbbbbbbbbbbbbFFuuFFuuFFuuFFuFFFuFFFuFbc;y:Ldkxebbbdbbb;W:Obb";
  var wasmpack = new Uint8Array([
    32,
    0,
    65,
    2,
    1,
    106,
    34,
    33,
    3,
    128,
    11,
    4,
    13,
    64,
    6,
    253,
    10,
    7,
    15,
    116,
    127,
    5,
    8,
    12,
    40,
    16,
    19,
    54,
    20,
    9,
    27,
    255,
    113,
    17,
    42,
    67,
    24,
    23,
    146,
    148,
    18,
    14,
    22,
    45,
    70,
    69,
    56,
    114,
    101,
    21,
    25,
    63,
    75,
    136,
    108,
    28,
    118,
    29,
    73,
    115
  ]);
  if (typeof WebAssembly !== "object") {
    return {
      supported: false
    };
  }
  var instance;
  var ready = WebAssembly.instantiate(unpack(wasm), {}).then(function(result) {
    instance = result.instance;
    instance.exports.__wasm_call_ctors();
  });
  function unpack(data) {
    var result = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
      var ch = data.charCodeAt(i);
      result[i] = ch > 96 ? ch - 97 : ch > 64 ? ch - 39 : ch + 4;
    }
    var write = 0;
    for (var i = 0; i < data.length; ++i) {
      result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
    }
    return result.buffer.slice(0, write);
  }
  function assert(cond) {
    if (!cond) {
      throw new Error("Assertion failed");
    }
  }
  function bytes(view) {
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  }
  function genremap(fun, positions, vertices, stride) {
    var sbrk = instance.exports.sbrk;
    var rp = sbrk(vertices * 4);
    var sp = sbrk(vertices * stride * 4);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(positions), sp);
    fun(rp, sp, vertices, stride * 4);
    heap = new Uint8Array(instance.exports.memory.buffer);
    var remap = new Uint32Array(vertices);
    new Uint8Array(remap.buffer).set(heap.subarray(rp, rp + vertices * 4));
    sbrk(rp - sbrk(0));
    return remap;
  }
  function reorder(fun, indices, vertices) {
    var sbrk = instance.exports.sbrk;
    var ip = sbrk(indices.length * 4);
    var rp = sbrk(vertices * 4);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    var indices8 = bytes(indices);
    heap.set(indices8, ip);
    var unique = fun(rp, ip, indices.length, vertices);
    heap = new Uint8Array(instance.exports.memory.buffer);
    var remap = new Uint32Array(vertices);
    new Uint8Array(remap.buffer).set(heap.subarray(rp, rp + vertices * 4));
    sbrk(ip - sbrk(0));
    for (var i = 0; i < indices.length; ++i) indices[i] = remap[indices[i]];
    return [remap, unique];
  }
  function maxindex(source) {
    var result = 0;
    for (var i = 0; i < source.length; ++i) {
      var index = source[i];
      result = result < index ? index : result;
    }
    return result;
  }
  function simplify(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, target_index_count, target_error, options) {
    var sbrk = instance.exports.sbrk;
    var te = sbrk(4);
    var ti = sbrk(index_count * 4);
    var sp = sbrk(vertex_count * vertex_positions_stride);
    var si = sbrk(index_count * 4);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(vertex_positions), sp);
    heap.set(bytes(indices), si);
    var result = fun(ti, si, index_count, sp, vertex_count, vertex_positions_stride, target_index_count, target_error, options, te);
    heap = new Uint8Array(instance.exports.memory.buffer);
    var target = new Uint32Array(result);
    bytes(target).set(heap.subarray(ti, ti + result * 4));
    var error = new Float32Array(1);
    bytes(error).set(heap.subarray(te, te + 4));
    sbrk(te - sbrk(0));
    return [target, error[0]];
  }
  function simplifyAttr(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, vertex_attributes, vertex_attributes_stride, attribute_weights, vertex_lock, target_index_count, target_error, options) {
    var sbrk = instance.exports.sbrk;
    var te = sbrk(4);
    var ti = sbrk(index_count * 4);
    var sp = sbrk(vertex_count * vertex_positions_stride);
    var sa = sbrk(vertex_count * vertex_attributes_stride);
    var sw = sbrk(attribute_weights.length * 4);
    var si = sbrk(index_count * 4);
    var vl = vertex_lock ? sbrk(vertex_count) : 0;
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(vertex_positions), sp);
    heap.set(bytes(vertex_attributes), sa);
    heap.set(bytes(attribute_weights), sw);
    heap.set(bytes(indices), si);
    if (vertex_lock) {
      heap.set(bytes(vertex_lock), vl);
    }
    var result = fun(
      ti,
      si,
      index_count,
      sp,
      vertex_count,
      vertex_positions_stride,
      sa,
      vertex_attributes_stride,
      sw,
      attribute_weights.length,
      vl,
      target_index_count,
      target_error,
      options,
      te
    );
    heap = new Uint8Array(instance.exports.memory.buffer);
    var target = new Uint32Array(result);
    bytes(target).set(heap.subarray(ti, ti + result * 4));
    var error = new Float32Array(1);
    bytes(error).set(heap.subarray(te, te + 4));
    sbrk(te - sbrk(0));
    return [target, error[0]];
  }
  function simplifyUpdate(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, vertex_attributes, vertex_attributes_stride, attribute_weights, vertex_lock, target_index_count, target_error, options) {
    var sbrk = instance.exports.sbrk;
    var te = sbrk(4);
    var sp = sbrk(vertex_count * vertex_positions_stride);
    var sa = sbrk(vertex_count * vertex_attributes_stride);
    var sw = sbrk(attribute_weights.length * 4);
    var si = sbrk(index_count * 4);
    var vl = vertex_lock ? sbrk(vertex_count) : 0;
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(vertex_positions), sp);
    heap.set(bytes(vertex_attributes), sa);
    heap.set(bytes(attribute_weights), sw);
    heap.set(bytes(indices), si);
    if (vertex_lock) {
      heap.set(bytes(vertex_lock), vl);
    }
    var result = fun(
      si,
      index_count,
      sp,
      vertex_count,
      vertex_positions_stride,
      sa,
      vertex_attributes_stride,
      sw,
      attribute_weights.length,
      vl,
      target_index_count,
      target_error,
      options,
      te
    );
    heap = new Uint8Array(instance.exports.memory.buffer);
    bytes(indices).set(heap.subarray(si, si + result * 4));
    bytes(vertex_positions).set(heap.subarray(sp, sp + vertex_count * vertex_positions_stride));
    bytes(vertex_attributes).set(heap.subarray(sa, sa + vertex_count * vertex_attributes_stride));
    var error = new Float32Array(1);
    bytes(error).set(heap.subarray(te, te + 4));
    sbrk(te - sbrk(0));
    return [result, error[0]];
  }
  function simplifyScale(fun, vertex_positions, vertex_count, vertex_positions_stride) {
    var sbrk = instance.exports.sbrk;
    var sp = sbrk(vertex_count * vertex_positions_stride);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(vertex_positions), sp);
    var result = fun(sp, vertex_count, vertex_positions_stride);
    sbrk(sp - sbrk(0));
    return result;
  }
  function simplifyPoints(fun, vertex_positions, vertex_count, vertex_positions_stride, vertex_colors, vertex_colors_stride, color_weight, target_vertex_count) {
    var sbrk = instance.exports.sbrk;
    var ti = sbrk(target_vertex_count * 4);
    var sp = sbrk(vertex_count * vertex_positions_stride);
    var sc = vertex_colors ? sbrk(vertex_count * vertex_colors_stride) : 0;
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(vertex_positions), sp);
    if (vertex_colors) {
      heap.set(bytes(vertex_colors), sc);
    }
    var result = fun(ti, sp, vertex_count, vertex_positions_stride, sc, vertex_colors_stride, color_weight, target_vertex_count);
    heap = new Uint8Array(instance.exports.memory.buffer);
    var target = new Uint32Array(result);
    bytes(target).set(heap.subarray(ti, ti + result * 4));
    sbrk(ti - sbrk(0));
    return target;
  }
  function simplifySloppy(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, vertex_lock, target_index_count, target_error) {
    var sbrk = instance.exports.sbrk;
    var te = sbrk(4);
    var ti = sbrk(index_count * 4);
    var sp = sbrk(vertex_count * vertex_positions_stride);
    var si = sbrk(index_count * 4);
    var vl = vertex_lock ? sbrk(vertex_count) : 0;
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(vertex_positions), sp);
    heap.set(bytes(indices), si);
    if (vertex_lock) {
      heap.set(bytes(vertex_lock), vl);
    }
    var result = fun(ti, si, index_count, sp, vertex_count, vertex_positions_stride, vl, target_index_count, target_error, te);
    heap = new Uint8Array(instance.exports.memory.buffer);
    var target = new Uint32Array(result);
    bytes(target).set(heap.subarray(ti, ti + result * 4));
    var error = new Float32Array(1);
    bytes(error).set(heap.subarray(te, te + 4));
    sbrk(te - sbrk(0));
    return [target, error[0]];
  }
  function simplifyPrune(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, target_error) {
    var sbrk = instance.exports.sbrk;
    var ti = sbrk(index_count * 4);
    var sp = sbrk(vertex_count * vertex_positions_stride);
    var si = sbrk(index_count * 4);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(vertex_positions), sp);
    heap.set(bytes(indices), si);
    var result = fun(ti, si, index_count, sp, vertex_count, vertex_positions_stride, target_error);
    heap = new Uint8Array(instance.exports.memory.buffer);
    var target = new Uint32Array(result);
    bytes(target).set(heap.subarray(ti, ti + result * 4));
    sbrk(ti - sbrk(0));
    return target;
  }
  function remesh(fun, indices, vertex_positions, vertex_positions_stride, resolution, options) {
    var sbrk = instance.exports.sbrk;
    var sp = sbrk(vertex_positions.byteLength);
    var si = sbrk(indices.byteLength);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(vertex_positions), sp);
    heap.set(bytes(indices), si);
    var vertex_count = vertex_positions.byteLength / vertex_positions_stride;
    var capacity = fun(0, 0, si, indices.length, sp, vertex_count, vertex_positions_stride, resolution, options);
    var tp = sbrk(capacity * 9 * 4);
    var count = fun(tp, capacity, si, indices.length, sp, vertex_count, vertex_positions_stride, resolution, options);
    assert(count <= capacity);
    heap = new Uint8Array(instance.exports.memory.buffer);
    var target = new Float32Array(count * 9);
    bytes(target).set(heap.subarray(tp, tp + target.byteLength));
    sbrk(sp - sbrk(0));
    return target;
  }
  var simplifyOptions = {
    LockBorder: 1,
    Sparse: 2,
    ErrorAbsolute: 4,
    Prune: 8,
    Regularize: 16,
    Permissive: 32,
    RegularizeLight: 64,
    PreserveFolds: 128,
    ErrorClamped: 256,
    _InternalDebug: 1 << 30
    // internal, don't use!
  };
  var remeshOptions = {
    Shell: 1,
    Solve: 2,
    Thicken: 0,
    // currently a no-op but may be re-added in the future
    _InternalDebug: 1 << 30
    // internal, don't use!
  };
  return {
    ready,
    supported: true,
    compactMesh: function(indices) {
      assert(
        indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array
      );
      assert(indices.length % 3 == 0);
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      var result = reorder(instance.exports.meshopt_optimizeVertexFetchRemap, indices32, maxindex(indices) + 1);
      if (indices !== indices32) {
        for (var i = 0; i < indices32.length; ++i) {
          indices[i] = indices32[i];
        }
      }
      return result;
    },
    generatePositionRemap: function(vertex_positions, vertex_positions_stride) {
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      return genremap(
        instance.exports.meshopt_generatePositionRemap,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride
      );
    },
    simplify: function(indices, vertex_positions, vertex_positions_stride, target_index_count, target_error, flags) {
      assert(
        indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array
      );
      assert(indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(target_index_count >= 0 && target_index_count <= indices.length);
      assert(target_index_count % 3 == 0);
      assert(target_error >= 0);
      var options = 0;
      for (var i = 0; i < (flags ? flags.length : 0); ++i) {
        assert(flags[i] in simplifyOptions);
        options |= simplifyOptions[flags[i]];
      }
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      var result = simplify(
        instance.exports.meshopt_simplify,
        indices32,
        indices.length,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride * 4,
        target_index_count,
        target_error,
        options
      );
      result[0] = indices instanceof Uint32Array ? result[0] : new indices.constructor(result[0]);
      return result;
    },
    simplifyWithAttributes: function(indices, vertex_positions, vertex_positions_stride, vertex_attributes, vertex_attributes_stride, attribute_weights, vertex_lock, target_index_count, target_error, flags) {
      assert(
        indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array
      );
      assert(indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(vertex_attributes instanceof Float32Array);
      assert(vertex_attributes.length == vertex_attributes_stride * (vertex_positions.length / vertex_positions_stride));
      assert(vertex_attributes_stride >= 0);
      assert(vertex_lock == null || vertex_lock instanceof Uint8Array);
      assert(vertex_lock == null || vertex_lock.length == vertex_positions.length / vertex_positions_stride);
      assert(target_index_count >= 0 && target_index_count <= indices.length);
      assert(target_index_count % 3 == 0);
      assert(target_error >= 0);
      assert(Array.isArray(attribute_weights));
      assert(vertex_attributes_stride >= attribute_weights.length);
      assert(attribute_weights.length <= 32);
      for (var i = 0; i < attribute_weights.length; ++i) {
        assert(attribute_weights[i] >= 0);
      }
      var options = 0;
      for (var i = 0; i < (flags ? flags.length : 0); ++i) {
        assert(flags[i] in simplifyOptions);
        options |= simplifyOptions[flags[i]];
      }
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      var result = simplifyAttr(
        instance.exports.meshopt_simplifyWithAttributes,
        indices32,
        indices.length,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride * 4,
        vertex_attributes,
        vertex_attributes_stride * 4,
        new Float32Array(attribute_weights),
        vertex_lock,
        target_index_count,
        target_error,
        options
      );
      result[0] = indices instanceof Uint32Array ? result[0] : new indices.constructor(result[0]);
      return result;
    },
    simplifyWithUpdate: function(indices, vertex_positions, vertex_positions_stride, vertex_attributes, vertex_attributes_stride, attribute_weights, vertex_lock, target_index_count, target_error, flags) {
      assert(
        indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array
      );
      assert(indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(vertex_attributes instanceof Float32Array);
      assert(vertex_attributes.length == vertex_attributes_stride * (vertex_positions.length / vertex_positions_stride));
      assert(vertex_attributes_stride >= 0);
      assert(vertex_lock == null || vertex_lock instanceof Uint8Array);
      assert(vertex_lock == null || vertex_lock.length == vertex_positions.length / vertex_positions_stride);
      assert(target_index_count >= 0 && target_index_count <= indices.length);
      assert(target_index_count % 3 == 0);
      assert(target_error >= 0);
      assert(Array.isArray(attribute_weights));
      assert(vertex_attributes_stride >= attribute_weights.length);
      assert(attribute_weights.length <= 32);
      for (var i = 0; i < attribute_weights.length; ++i) {
        assert(attribute_weights[i] >= 0);
      }
      var options = 0;
      for (var i = 0; i < (flags ? flags.length : 0); ++i) {
        assert(flags[i] in simplifyOptions);
        options |= simplifyOptions[flags[i]];
      }
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      var result = simplifyUpdate(
        instance.exports.meshopt_simplifyWithUpdate,
        indices32,
        indices.length,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride * 4,
        vertex_attributes,
        vertex_attributes_stride * 4,
        new Float32Array(attribute_weights),
        vertex_lock,
        target_index_count,
        target_error,
        options
      );
      if (indices !== indices32) {
        for (var i = 0; i < result[0]; ++i) {
          indices[i] = indices32[i];
        }
      }
      return result;
    },
    getScale: function(vertex_positions, vertex_positions_stride) {
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      return simplifyScale(
        instance.exports.meshopt_simplifyScale,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride * 4
      );
    },
    simplifyPoints: function(vertex_positions, vertex_positions_stride, target_vertex_count, vertex_colors, vertex_colors_stride, color_weight) {
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(target_vertex_count >= 0 && target_vertex_count <= vertex_positions.length / vertex_positions_stride);
      if (vertex_colors) {
        assert(vertex_colors instanceof Float32Array);
        assert(vertex_colors.length % vertex_colors_stride == 0);
        assert(vertex_colors_stride >= 3);
        assert(vertex_positions.length / vertex_positions_stride == vertex_colors.length / vertex_colors_stride);
        return simplifyPoints(
          instance.exports.meshopt_simplifyPoints,
          vertex_positions,
          vertex_positions.length / vertex_positions_stride,
          vertex_positions_stride * 4,
          vertex_colors,
          vertex_colors_stride * 4,
          color_weight || 0,
          target_vertex_count
        );
      } else {
        return simplifyPoints(
          instance.exports.meshopt_simplifyPoints,
          vertex_positions,
          vertex_positions.length / vertex_positions_stride,
          vertex_positions_stride * 4,
          void 0,
          0,
          0,
          target_vertex_count
        );
      }
    },
    simplifySloppy: function(indices, vertex_positions, vertex_positions_stride, vertex_lock, target_index_count, target_error) {
      assert(
        indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array
      );
      assert(indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(vertex_lock == null || vertex_lock instanceof Uint8Array);
      assert(vertex_lock == null || vertex_lock.length == vertex_positions.length / vertex_positions_stride);
      assert(target_index_count >= 0 && target_index_count <= indices.length);
      assert(target_index_count % 3 == 0);
      assert(target_error >= 0);
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      var result = simplifySloppy(
        instance.exports.meshopt_simplifySloppy,
        indices32,
        indices.length,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride * 4,
        vertex_lock,
        target_index_count,
        target_error
      );
      result[0] = indices instanceof Uint32Array ? result[0] : new indices.constructor(result[0]);
      return result;
    },
    simplifyPrune: function(indices, vertex_positions, vertex_positions_stride, target_error) {
      assert(
        indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array
      );
      assert(indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(target_error >= 0);
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      var result = simplifyPrune(
        instance.exports.meshopt_simplifyPrune,
        indices32,
        indices.length,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride * 4,
        target_error
      );
      result = indices instanceof Uint32Array ? result : new indices.constructor(result);
      return result;
    },
    remesh: function(indices, vertex_positions, vertex_positions_stride, resolution, flags) {
      assert(
        indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array
      );
      assert(indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(resolution >= 4 && resolution <= 256);
      var options = 0;
      for (var i = 0; i < (flags ? flags.length : 0); ++i) {
        assert(flags[i] in remeshOptions);
        options |= remeshOptions[flags[i]];
      }
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      return remesh(instance.exports.meshopt_remesh, indices32, vertex_positions, vertex_positions_stride * 4, resolution, options);
    }
  };
})();

// node_modules/meshoptimizer/meshopt_clusterizer.js
var MeshoptClusterizer = (function() {
  var wasm = "b9H79Tebbbe:neP9Geueu9Geub9Gbb9Giuuueu9Gmuuuuuuuuuuu9999eu9Gouuuuuueu9Gruuuuuuub9Gxuuuuuuuuuuuueu9Gxuuuuuuuuuuu99eu9GPuuuuuuuuuuuuu99b9Gouuuuuub9Gwuuuuuuuub9Gvuuuuub9GluuuubiQXdilvorwDqokoqxmbiibeilve9Weiiviebeoweuecj:Gdkr;Zeqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9I919P29K9nW79O2Wt79c9V919U9KbeY9TW79O9V9Wt9F9I919P29K9nW79O2Wt7S2W94bd39TW79O9V9Wt9F9I919P29K9nW79O2Wt79t9W9Ht9P9H2bo39TW79O9V9Wt9F9J9V9T9W91tWJ2917tWV9c9V919U9K7bw39TW79O9V9Wt9F9J9V9T9W91tW9nW79O2Wt9c9V919U9K7bkE9TW79O9V9Wt9F9J9V9T9W91tW9t9W9OWVW9c9V919U9K7bxL9TW79O9V9Wt9F9V9Wt9P9T9P96W9nW79O2WtbPl79IV9RbsDwebcekdOAq;W:leXdbkIbabaec9:fgefcufae9Ugeabci9Uadfcufad9Ugbaeab0Ek:88JDPue99eux99due99euo99iu8Jjjjjbc:WD9Rgm8KjjjjbdndnalmbcbhPxekamc:Cwfcbc;Kbz:rjjjb8AcuaocdtgsaocFFFFi0Ehzcbyd;0:G:cjbhHdndnalcb9imbaoal9nmbamazaHHjjjjbbgHBd:CwamceBd;8wamazcbyd;0:G:cjbHjjjjbbgOBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;0:G:cjbHjjjjbbgABd:KwamciBd;8waihzalhsinaHazydbcdtfcbBdbazclfhzascufgsmbkaihzalhsinaHazydbcdtfgCaCydbcefBdbazclfhzascufgsmbkaihzalhCcbhXindnaHazydbcdtgQfgsydbcb9imbaOaQfaXBdbasasydbgQcjjjj94VBdbaQaXfhXkazclfhzaCcufgCmbkalci9UhLdnalci6mbcbhzaihsinascwfydbhCasclfydbhXaOasydbcdtfgQaQydbgQcefBdbaAaQcdtfazBdbaOaXcdtfgXaXydbgXcefBdbaAaXcdtfazBdbaOaCcdtfgCaCydbgCcefBdbaAaCcdtfazBdbascxfhsaLazcefgz9hmbkkaihzalhsindnaHazydbcdtgCfgXydbgQcu9kmbaXaQcFFFFrGgQBdbaOaCfgCaCydbaQ9RBdbkazclfhzascufgsmbxdkkamazaHHjjjjbbgHBd:CwamceBd;8wamazcbyd;0:G:cjbHjjjjbbgOBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;0:G:cjbHjjjjbbgABd:KwamciBd;8waHcbasz:rjjjbhXaihzalhsinaXazydbcdtfgCaCydbcefBdbazclfhzascufgsmbkalci9UhLdnaoTmbcbhzaOhsaXhCaohQinasazBdbasclfhsaCydbazfhzaCclfhCaQcufgQmbkkdnalci6mbcbhzaihsinascwfydbhCasclfydbhQaOasydbcdtfgKaKydbgKcefBdbaAaKcdtfazBdbaOaQcdtfgQaQydbgQcefBdbaAaQcdtfazBdbaOaCcdtfgCaCydbgCcefBdbaAaCcdtfazBdbascxfhsaLazcefgz9hmbkkaoTmbcbhzaohsinaOazfgCaCydbaXazfydb9RBdbazclfhzascufgsmbkkamaLcbyd;0:G:cjbHjjjjbbgzBd:OwamclBd;8wazcbaLz:rjjjbhYamcuaLcK2alcjjjjd0Ecbyd;0:G:cjbHjjjjbbg8ABd:SwamcvBd;8wJbbbbhEdnalci6g3mbarcd4hKaihsa8AhzaLhrJbbbbh5inavasclfydbaK2cdtfgCIdlh8EavasydbaK2cdtfgXIdlhEavascwfydbaK2cdtfgQIdlh8FaCIdwhaaXIdwhhaQIdwhgazaCIdbg8JaXIdbg8KMaQIdbg8LMJbbnn:vUdbazclfaXIdlaCIdlMaQIdlMJbbnn:vUdbaQIdwh8MaCIdwh8NaXIdwhyazcxfa8EaE:tg8Eagah:tggNaaah:tgaa8FaE:tghN:tgEJbbbbJbbjZa8Ja8K:tg8FahNa8Ea8La8K:tg8KN:tghahNaEaENaaa8KNa8FagN:tgEaENMMg8K:rg8E:va8KJbbbb9BEg8KNUdbazczfaEa8KNUdbazcCfaha8KNUdbazcwfa8Maya8NMMJbbnn:vUdba5a8EMh5ascxfhsazcKfhzarcufgrmbka5aL:Z:vJbbbZNhEkamcuaLcdtalcFFFF970Ecbyd;0:G:cjbHjjjjbbgCBd:WwamcoBd;8waq:Zhhdna3mbcbhzaChsinasazBdbasclfhsaLazcefgz9hmbkkaEahNhhamcuaLcltalcFFFFd0Ecbyd;0:G:cjbHjjjjbbg8PBd:0wamcrBd;8wcba8Pa8AaCaLcbz:djjjb8AJFFuuh8MJFFuuh8NJFFuuhydnalci6mbJFFuuhya8AhzaLhsJFFuuh8NJFFuuh8MinazcwfIdbgEa8Ma8MaE9EEh8MazclfIdbgEa8Na8NaE9EEh8NazIdbgEayayaE9EEhyazcKfhzascufgsmbkkah:rhEamaocetgzcuaocu9kEcbyd;0:G:cjbHjjjjbbgCBd:4wdndnaoal9nmbaihzalhsinaCazydbcetfcFFi87ebazclfhzascufgsmbxdkkaCcFeazz:rjjjb8AkaEJbbbZNh8JcuhIdnalci6mbcbhsJFFuuhEa8AhzcuhIinazcwfIdba8M:tghahNazIdbay:tghahNazclfIdba8N:tghahNMM:rghaEaIcuSahaE9DVgXEhEasaIaXEhIazcKfhzaLascefgs9hmbkkamczfcbcjwz:rjjjb8Aam9cb83iwam9cb83ibaxa8JNh8RJbbjZak:th8Lcbh8SJbbbbhRJbbbbh8UJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8Ycbh8ZcbhPinJbbbbhEdna8STmbJbbjZa8S:Z:vhEkJbbbbhhdna8Ya8YNa8Wa8WNa8Xa8XNMMg8KJbbbb9BmbJbbjZa8K:r:vhhka8VaENh8Ka8UaENh5aRaENh8EaIhLdndndndndna8SaPVTmbamydwg80Tmea8YahNh8Fa8XahNhaa8WahNhgaeamydbcdtfh81cbh3JFFuuhEcvhQcuhLindnaHa81a3cdtfydbcdtgzfydbgvTmbaAaOazfydbcdtfhsindndnaCaiasydbgKcx2fgzclfydbgrcetf8Vebcs4aCazydbgXcetf8Vebcs4faCazcwfydbglcetf8Vebcs4fgombcbhzxekcehzaHaXcdtfydbgXceSmbcehzaHarcdtfydbgrceSmbcehzaHalcdtfydbglceSmbdnarcdSaXcdSfalcdSfcd6mbaocefhzxekaocdfhzkdnazaQ9kmba8AaKcK2fgXIdwa8K:tghahNaXIdba8E:tghahNaXIdla5:tghahNMM:ra8J:va8LNJbbjZMJ9VO:d86JbbjZaXIdCa8FNaXIdxagNaaaXIdzNMMakN:tghahJ9VO:d869DENghaEazaQ6ahaE9DVgXEhEaKaLaXEhLazaQaXEhQkasclfhsavcufgvmbkka3cefg3a809hmbkkaLcu9hmekama8KUd:ODama5Ud:KDama8EUd:GDamcuBd:qDamcFFF;7rBdjDa8Pcba8AaYamc:GDfamc:qDfamcjDfz:ejjjbamyd:qDhLdndnaxJbbbb9ETmba8SaD6mbaLcuSmeceh3amIdjDa8R9EmixdkaLcu9hmekdna8STmbabaPcltfgHam8Piw83dwaHam8Pib83dbaPcefhPkc3hHinamc:CwfaHfydbcbyd;4:G:cjbH:bjjjbbaHc98fgHc989hmbxvkkcbh3a8Saq9pmbamydwaCaiaLcx2fgzydbcetf8Vebcs4aCazcwfydbcetf8Vebcs4faCazclfydbcetf8Vebcs4ffaw9nmekcbhzcbhsdna8ZTmbcbhsamczfhXinamczfascdtfaXydbgQBdbaXclfhXasaYaQfRbbTfhsa8Zcufg8ZmbkkamydwhlamydbhXam9cu83i:GDam9cu83i:ODam9cu83i:qDam9cu83i:yDinamcjDfazfcFFF;7rBdbazclfgzcz9hmbkasc;8easclfc:bd6Eg8Zcdth80dnalTmbaeaXcdtfhocbhrindnaHaoarcdtfydbcdtgzfydbgvTmbaAaOazfydbcdtfhscuhQcuhzinaHaiasydbgKcx2fgXclfydbcdtfydbaHaXydbcdtfydbfaHaXcwfydbcdtfydbfgXazaXaz6gXEhzaKaQaXEhQasclfhsavcufgvmbkaQcuSmba8AaQcK2fgsIdwa8M:tgEaENasIdbay:tgEaENasIdla8N:tgEaENMM:rhEcbhsindndnazamc:qDfasfgvydbgX6mbazaX9hmeaEamcjDfasfIdb9FTmekavazBdbamc:GDfasfaQBdbamcjDfasfaEUdbxdkasclfgscz9hmbkkarcefgral9hmbkkamczfa80fhQcbhzcbhsindnamc:GDfazfydbgXcuSmbaQascdtfaXBdbascefhskazclfgzcz9hmbkasa8Zfg8ZTmbJFFuuhhcuhKamczfhza8ZhvcuhQina8AazydbgXcK2fgsIdwa8M:tgEaENasIdbay:tgEaENasIdla8N:tgEaENMM:rhEdndnaHaiaXcx2fgsclfydbcdtfydbaHasydbcdtfydbfaHascwfydbcdtfydbfgsaQ6mbasaQ9hmeaEah9DTmekaEhhashQaXhKkazclfhzavcufgvmbkaKcuSmbaKhLkdnamaiaLcx2fgrydbarclfydbarcwfydbaCabaeadaPawaqa3z:fjjjbTmbaPcefhPJbbbbhRJbbbbh8UJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8YkcbhXinaAaOaraXcdtfydbcdtgsfydbcdtfgKhzaHasfgvydbgQhsdnaQTmbdninazydbaLSmeazclfhzascufgsTmdxbkkazaKaQcdtfc98fydbBdbavavydbcufBdbkaXcefgXci9hmbka8AaLcK2fgzIdbhEazIdlhhazIdwh8KazIdxh5azIdzh8EazIdCh8FaYaLfce86bba8Ya8FMh8Ya8Xa8EMh8Xa8Wa5Mh8Wa8Va8KMh8Va8UahMh8UaRaEMhRamydxh8Sxbkkamc:WDf8KjjjjbaPkjoivuv99lu8Jjjjjbca9Rgo8Kjjjjbdndnalcw0mbaiydbhraeabcitfgwalcdtciVBdlawarBdbdnalcd6mbaiclfhralcufhDawcxfhwinarydbhqawcuBdbawc98faqBdbawcwfhwarclfhraDcufgDmbkkalabfhwxekcbhqaocbBdKao9cb83izaocbBdwao9cb83ibJbbjZhkJbbjZhxinadaiaqcdtfydbcK2fhDcbhwinaoczfawfgraDawfIdbgmarIdbgP:tgsaxNaPMgPUdbaoawfgrasamaP:tNarIdbMUdbawclfgwcx9hmbkJbbjZakJbbjZMgk:vhxaqcefgqal9hmbkcbhradcbcecdaoIdlgmaoIdwgP9GEgwaoIdbgsaP9GEawasam9GEgzcdtgwfhHaoczfawfIdbhmaihwalhDinaiarcdtfgqydbhOaqawydbgABdbawaOBdbawclfhwaraHaAcK2fIdbam9DfhraDcufgDmbkdndnarcv6mbavc8X9kmbaralc98f6mekaiydbhraeabcitfgwalcdtciVBdlawarBdbaiclfhralcufhDawcxfhwinarydbhqawcuBdbawc98faqBdbawcwfhwarclfhraDcufgDmbkalabfhwxekaeabcitfgwamUdbawawydlc98GazVBdlabcefaeadaiaravcefgqz:djjjbhDawawydlciGaDabcu7fcdtVBdlaDaeadaiarcdtfalar9Raqz:djjjbhwkaocaf8Kjjjjbawk;Oddvue99dninabaecitfgrydlgwcd4gDTmednawciGgqci9hmbcihqdnawcl6mbabaecitfhbcbheawhqcehkindnaiabydbgDfRbbmbcbhkadaDcK2fgwIdwalIdw:tgxaxNawIdbalIdb:tgxaxNawIdlalIdl:tgxaxNMM:rgxaoIdb9DTmbaoaxUdbavaDBdbarydlhqkabcwfhbaecefgeaqcd46mbkakceGTmikaraqciGBdlskdnabcbaDalaqcdtfIdbarIdb:tgxJbbbb9FEgwaD7aecefgDfgecitfydlabawaDfgDcitfydlVci0mbaraqBdlkabaDadaialavaoz:ejjjbax:laoIdb9Fmbkkkjlevudndnabydwgxaladcetfgm8Vebcs4alaecetfgP8Vebgscs4falaicetfgz8Vebcs4ffaD0mbakmbcbhDabydxaq6mekavawcltfgxab8Pdw83dwaxab8Pdb83dbabydbhDdnabydwgwTmbaoaDcdtfhxawhsinalaxydbcetfcFFi87ebaxclfhxascufgsmbkkabaDawfBdbabydxhxab9cb83dwababydlaxci2fBdlaP8VebhscehDcbhxkdnascztcz91cu9kmbabaxcefBdwaPax87ebaoabydbcdtfaxcdtfaeBdbkdnam8Uebcu9kmbababydwgxcefBdwamax87ebaoabydbcdtfaxcdtfadBdbkdnaz8Uebcu9kmbababydwgxcefBdwazax87ebaoabydbcdtfaxcdtfaiBdbkarabydlfabydxci2faPRbb86bbarabydlfabydxci2fcefamRbb86bbarabydlfabydxci2fcdfazRbb86bbababydxcefBdxaDk:mPrHue99eue99eue99iu8Jjjjjbc;W;Gb9Rgx8KjjjjbdndnalmbcbhmxekcbhPaxc:m;Gbfcbc;Kbz:rjjjb8Aaxcualci9UgscltascjjjjiGEcbyd;0:G:cjbHjjjjbbgzBd:m9GaxceBd;S9GaxcuascK2gHcKfalcpFFFe0Ecbyd;0:G:cjbHjjjjbbgOBd:q9GaxcdBd;S9Gdnalci6gAmbarcd4hCascdthXaOhQazhLinavaiaPcx2fgrydwaC2cdtfhKavarydlaC2cdtfhYavarydbaC2cdtfh8AcbhraLhEinaQarfgma8Aarfg3Idbg5aYarfg8EIdbg8Fa5a8F9DEg5UdbamaKarfgaIdbg8Fa5a8Fa59DEg8FUdbamcxfgma3Idbg5a8EIdbgha5ah9EEg5UdbamaaIdbgha5aha59EEg5UdbaEa8Fa5MJbbbZNUdbaEaXfhEarclfgrcx9hmbkaQcKfhQaLclfhLaPcefgPas9hmbkkaOaHfgr9cb83dbar9cb83dzar9cb83dwaxcuascx2gralc:bjjjl0Ecbyd;0:G:cjbHjjjjbbgHBdN9GaxciBd;S9GascdthgazarfhvaxcwVhPaxclVhCaHh8Jazh8KcbhLinaxcbcj;Gbz:rjjjbhEaLas2cdthadnaAmba8Khrash3inaEarydbgmc8F91cjjjj94Vam7gmcQ4cx2fg8Ea8EydwcefBdwaEamcd4cFrGcx2fg8Ea8EydbcefBdbaEamcx4cFrGcx2fgmamydlcefBdlarclfhra3cufg3mbkkazaafh8AaHaafhXcbhmcbh3cbh8EcbhainaEamfgrydbhQara3BdbarcwfgKydbhYaKaaBdbarclfgrydbhKara8EBdbaQa3fh3aYaafhaaKa8Efh8Eamcxfgmcj;Gb9hmbkdnaAmbcbhravhminamarBdbamclfhmasarcefgr9hmbkavhrashminaEa8Aarydbg3cdtfydbg8Ec8F91a8E7cd4cFrGcx2fg8Ea8Eydbg8EcefBdbaXa8Ecdtfa3Bdbarclfhramcufgmmbka8JhrashminaCa8Aarydbg3cdtfydbg8Ec8F91a8E7cx4cFrGcx2fg8Ea8Eydbg8EcefBdbava8Ecdtfa3BdbarclfhramcufgmmbkavhrashminaPa8Aarydbg3cdtfydbg8Ec8F91cjjjj94Va8E7cQ4cx2fg8Ea8Eydbg8EcefBdbaXa8Ecdtfa3Bdbarclfhramcufgmmbkka8Jagfh8Ja8Kagfh8KaLcefgLci9hmbkaEaocetgrcuaocu9kEcbyd;0:G:cjbHjjjjbbgKBd:y9GaEclBd;S9Gdndnaoal9nmbaihralhminaKarydbcetfcFFi87ebarclfhramcufgmmbxdkkaKcFearz:rjjjb8Akcbh8EaEascbyd;0:G:cjbHjjjjbbg8ABd:C9GaOaHaHascdtfaHascitfa8AascbazaKaiawaDaqakz:hjjjbdndnalci6mba8Ahrashmina8EarRbbfh8EarcefhramcufgmmbkaE9cb83iwaE9cb83ibalawc9:fgrfcufar9UgrasaDfcufaD9Ugmaram0EhYcbhmcbhra8Ehaincbh3dnarTmba8AarfRbbceSh3kamaEaiaHydbcx2fgQydbaQclfydbaQcwfydbaKabaeadamawaqa3a3ce7a8EaY9nVaaamfaY6VGz:fjjjbfhmaHclfhHaaa8AarfRbb9Rhaasarcefgr9hmbkaEydxTmeabamcltfgraE8Piw83dwaraE8Pib83dbamcefhmxekaE9cb83iwaE9cb83ibcbhmkczhrinaEc:m;Gbfarfydbcbyd;4:G:cjbH:bjjjbbarc98fgrc989hmbkkaxc;W;Gbf8Kjjjjbamk:wKDQue99iue99iul9:euw99iu8Jjjjjbc;qb9RgP8Kjjjjbaxhsaxhzdndnavax0gHmbdnavTmbcbhOaehzavhAinawaDazydbcx2fgCcwfydbcetfgX8VebhQawaCclfydbcetfgL8VebhKawaCydbcetfgC8VebhYaXce87ebaLce87ebaCce87ebaOaKcs4aYcs4faQcs4ffhOazclfhzaAcufgAmbkaehzavhAinawaDazydbcx2fgCcwfydbcetfcFFi87ebawaCclfydbcetfcFFi87ebawaCydbcetfcFFi87ebazclfhzaAcufgAmbkcehzaqhsaOaq0mekalce86bbalcefcbavcufz:rjjjb8AxekaPaiBdxaPadBdwaPaeBdlavakaqci9Ug8Aaka8Aak6EaHEgK9RhEaxaK9Rh3aKcufh5aKceth8EaKcdtgCc98fh8FavcitgOaC9Rarfc98fhaascufhhavcufhgaraOfh8JJbbjZas:Y:vh8KcbazceakaxSEg8Lcdtg8M9Rh8NJFFuuhycuh8PcbhIcbh8RinaPclfa8RcdtfydbhQaPcb8Pd:y:G:cjbg8S83i9iaPcb8Pd:q:G:cjbgR83inaPcb8Pd1:G:cjbg8U83iUaPcb8Pdj:G:cjbg8V83i8WaPa8S83iyaPaR83iaaPa8U83iKaPa8V83izaQavcdtgYfh8WcbhXinabaQaXcdtgLfydbcK2fhAcbhzinaPc8WfazfgCaAazfgOIdbg8XaCIdbg8Ya8Xa8Y9DEUdbaCczfgCaOcxfIdbg8XaCIdbg8Ya8Xa8Y9EEUdbazclfgzcx9hmbkaba8WaXcu7cdtfydbcK2fhAcbhzaPIdUh8ZaPId9ih80aPId80h81aPId9ehBaPId8Wh83aPIdnhUinaPczfazfgCaAazfgOIdbg8XaCIdbg8Ya8Xa8Y9DEUdbaCczfgCaOcxfIdbg8XaCIdbg8Ya8Xa8Y9EEUdbazclfgzcx9hmbkaraLfgza80a8Z:tg8XaUa83:tg8YNa8YaBa81:tg8ZNa8Za8XNMMUdbazaYfaPIdyaPIdK:tg8XaPIdaaPIdz:tg8YNa8YaPId8KaPIdC:tg8ZNa8Za8XNMMUdbaXcefgXav9hmbkcbh85dnaHmbcbhAaQhza8JhCavhXinawaDazydbcx2fgOcwfydbcetfgL8Vebh8WawaOclfydbcetfg858Vebh86awaOydbcetfgO8Vebh87aLce87eba85ce87ebaOce87ebaCaAa86cs4a87cs4fa8Wcs4ffgABdbazclfhzaCclfhCaXcufgXmbkavhCinawaDaQydbcx2fgzcwfydbcetfcFFi87ebawazclfydbcetfcFFi87ebawazydbcetfcFFi87ebaQclfhQaCcufgCmbka8Jh85kdndndndndndndndndndndnava8E6mba8Eax9nmeavavaK9UgzaK29Raza320mda5aE9pmqa85Th87ceh8WaEhQxwka5ag9pmDa8Eax9nmixokavaK6mea5aE9pmwcehQaEhXa85Tmixlka5ag6mlxrka5ag9pmokcbhQaghXa85mekJFFuuh8XcbhLa5hzindnazcefgCaK6mbaQavaC9RgOaK6GmbarazcdtfIdbg8YaC:YNaravaz9RcdtfaYfc94fIdbg8ZaO:YNMg80a8X9Embdndna8KaOahf:YNg81:lJbbb9p9DTmba81:OhAxekcjjjj94hAka8ZasaA2aO9R:YNh8Zdndna8Kazasf:YNg81:lJbbb9p9DTmba81:OhOxekcjjjj94hOkamasaO2aC9R:Ya8YNa8ZMNa80Mg8Ya8Xa8Ya8X9DgOEh8XaCaLaOEhLkaza8LfgzaX6mbxlkkJFFuuh8XcbhLaEhCaahAa8FhOaKhzindnazaK6mbaQaCaK6GmbaraOfIdbg8Yaz:YNaAIdbg8ZaC:YNMg80a8X9Embdndna8Ka85aOfydbgYahf:YNg81:lJbbb9p9DTmba81:Oh8Wxekcjjjj94h8Wkamasa8W2aY9R:Yg81a8YNa8Za81NMNa80Mg8Ya8Xa8Ya8X9DgYEh8XazaLaYEhLkaCa8L9RhCaAa8NfhAaOa8MfhOaza8LfgzcufaX6mbxikka85Th87cbh8WaghQkJFFuuh8XcbhLaEhCaahAa8FhOaKhzindnazazaK9UgXaK29RaXa320mbdna8WTmbaCaCaK9UgXaK29RaXa320mekaraOfIdbg8Yaz:YNaAIdbg8ZaC:YNMg80a8X9EmbazhXaChYdna87mba85aOfydbgXhYkdndna8KaYahf:YNg81:lJbbb9p9DTmba81:Oh86xekcjjjj94h86ka8Zasa862aY9R:YNh8Zdndna8KaXahf:YNg81:lJbbb9p9DTmba81:OhYxekcjjjj94hYkamasaY2aX9R:Ya8YNa8ZMNa80Mg8Ya8Xa8Ya8X9DgXEh8XazaLaXEhLkaCa8L9RhCaAa8NfhAaOa8MfhOaza8LfgzcufaQ6mbkkaLTmba8Xay9DTmba8XhyaLhIa8Rh8Pka8Rcefg8Rci9hmbkdndnaoc8X9kmba8Pcb9omeka8Acufh85cbhYindndndnavaY9RaxaYaxfav0Eg8WTmbcbhAaeaYcdtfgzhCa8WhXinawaDaCydbcx2fgOcwfydbcetfgQ8VebhbawaOclfydbcetfgL8VebhrawaOydbcetfgO8VebhKaQce87ebaLce87ebaOce87ebaAarcs4aKcs4fabcs4ffhAaCclfhCaXcufgXmbka8WhOinawaDazydbcx2fgCcwfydbcetfcFFi87ebawaCclfydbcetfcFFi87ebawaCydbcetfcFFi87ebazclfhzaOcufgOmbkaAaq0mekalaYfgzce86bbazcefcba8Wcufz:rjjjb8AxekalaYfgzce86bbazcefcba85z:rjjjb8Aa8Ah8Wka8WaYfgYav9pmdxbkkaravcdtg8WfhLdnaITmbaPclfa8PcdtfydbhzaIhCinaLazydbfcb86bbazclfhzaCcufgCmbkkdnavaI9nmbaPclfa8PcdtfydbaIcdtfhzavaI9RhCinaLazydbfce86bbazclfhzaCcufgCmbkkcbhYindnaYa8PSmbcbhzaraPclfaYcdtfydbgKa8Wz:qjjjbhCavhXaIhOinaKaOazaLaCydbgQfRbbgAEcdtfaQBdbaCclfhCaOaAfhOazaA9RcefhzaXcufgXmbkkaYcefgYci9hmbkabaeadaialaIaocefgCarawaDaqakaxamz:hjjjbabaeaIcdtgzfadazfaiazfalaIfavaI9RaCarawaDaqakaxamz:hjjjbkaPc;qbf8Kjjjjbk:Seeru8Jjjjjbc:q;ab9Rgo8Kjjjjbaoc:q8WfcFecjzz:rjjjb8AcbhrdnadTmbaehwadhDinaoarcdtfawydbgqBdbaoc:q8WfaqcFiGcdtfgkydbhxakaqBdbawclfhwaraxaq9hfhraDcufgDmbkkabaeadaoaraiavz:jjjjbaoc:q;abf8Kjjjjbk;Sqloud99euD998Jjjjjbc:W;ab9Rgr8KjjjjbdndnadTmbaocd4hwcbhDcbhqindnavaeclfydbaw2cdtfgkIdbavaeydbaw2cdtfgxIdbgm:tgPavaecwfydbaw2cdtfgsIdlaxIdlgz:tgHNakIdlaz:tgOasIdbam:tgAN:tgCaCNaOasIdwaxIdwgX:tgQNakIdwaX:tgOaHN:tgHaHNaOaANaPaQN:tgPaPNMMgOJbbbb9Bmbarc8WfaDcltfgkaCaO:rgO:vgCUdwakaPaO:vgPUdlakaHaO:vgHUdbakaCaXNaHamNazaPNMM:mUdxaDcefhDkaecxfheaqcifgqad6mbkab9cb83dyab9cb83daab9cb83dKab9cb83dzab9cb83dwab9cb83dbaDTmearcbBd8Sar9cb83iKar9cb83izarczfavalaoarc8Sfcbcraiz:kjjjbarIdKhQarIdChLarIdzhKar9cb83iwar9cb83ibararc8WfaDczarc8Sfcbcicbz:kjjjbJbbbbhmdnarIdwgzazNarIdbgHaHNarIdlgXaXNMMgCJbbbb9BmbJbbjZaC:r:vhmkazamNhCaXamNhXaHamNhHJbbjZhmarc8WfheaDhvinaecwfIdbaCNaeIdbaHNaXaeclfIdbNMMgzamazam9DEhmaeczfheavcufgvmbkabaQUdwabaLUdlabaKUdbabarId3UdxdndnamJ;n;m;m899FmbJbbbbhzarc8WfheinaecxfIdbaQaecwfIdbgPNaKaeIdbgONaLaeclfIdbgANMMMaCaPNaHaONaXaANMM:vgPazaPaz9EEhzaeczfheaDcufgDmbkabaCUd8KabaXUdaabaHUd3abaQaCazN:tUdKabaLaXazN:tUdCabaKaHazN:tUdzabJbbjZamamN:t:rgmUdydndnaCJbbj:;aCJbbj:;9GEgzJbbjZazJbbjZ9FEJbb;:9cNJbbbZJbbb:;aCJbbbb9GEMgz:lJbbb9p9DTmbaz:Ohexekcjjjj94hekabae86b8UdndnaXJbbj:;aXJbbj:;9GEgzJbbjZazJbbjZ9FEJbb;:9cNJbbbZJbbb:;aXJbbbb9GEMgz:lJbbb9p9DTmbaz:Ohvxekcjjjj94hvkabav86bRdndnaHJbbj:;aHJbbj:;9GEgzJbbjZazJbbjZ9FEJbb;:9cNJbbbZJbbb:;aHJbbbb9GEMgz:lJbbb9p9DTmbaz:Ohwxekcjjjj94hwkabaw86b8SdndnaecKtcK91:YJbb;:9c:vaC:t:lavcKtcK91:YJbb;:9c:vaX:t:lawcKtcK91:YJbb;:9c:vaH:t:lamMMMJbb;:9cNJbbjZMgm:lJbbb9p9DTmbam:Ohexekcjjjj94hekaecFbaecFb9iEhexekabcjjj;8iBdycFbhekabae86b8Vxekab9cb83dyab9cb83daab9cb83dKab9cb83dzab9cb83dwab9cb83dbkarc:W;abf8Kjjjjbk;7woDuo99eue99euv998Jjjjjbcje9Rgw8Kjjjjbawc;abfcbaocdtgDz:rjjjb8Aawc;GbfcbaDz:rjjjb8AawcafhDawhqaohkinaqcFFF97BdbaDcFFF;7rBdbaqclfhqaDclfhDakcufgkmbkavcd4hxaicd4hmdnadTmbaocx2hPcbhsinashzdnarTmbarascdtfydbhzkaeazam2cdtfgDIdwhHaDIdlhOaDIdbhAalazax2cdtfIdbhCcbhDawcafhqawc;Gbfhvawhkawc;abfhiinaCaDc:O:G:cjbfIdbaHNaDc:G:G:cjbfIdbaANaDc:K:G:cjbfIdbaONMMgXMhQazhLdnaXaC:tgXaqIdbgK9DgYmbavydbhLkavaLBdbazhLdnaQakIdbg8A9EmbaiydbhLa8AhQkaiaLBdbakaQUdbaqaXaKaYEUdbaiclfhiakclfhkavclfhvaqclfhqaPaDcxfgD9hmbkascefgsad9hmbkkJbbbbhQcbhLawc;GbfhDawc;abfhqcbhkinalaqydbgvax2cdtfIdbalaDydbgiax2cdtfIdbaeavam2cdtfgvIdwaeaiam2cdtfgiIdw:tgCaCNavIdbaiIdb:tgCaCNavIdlaiIdl:tgCaCNMM:rMMgCaQaCaQ9EgvEhQakaLavEhLaqclfhqaDclfhDaoakcefgk9hmbkJbbbbhCdnaeawc;abfaLcdtgqfydbgkam2cdtfgDIdwaeawc;Gbfaqfydbgvam2cdtfgqIdwgH:tgXaXNaDIdbaqIdbgA:tg8Aa8ANaDIdlaqIdlgE:tgOaONMMgKJbbbb9ETmbaK:rgCalakax2cdtfIdbMalavax2cdtfIdb:taCaCM:vhCkaQJbbbZNhKaXaCNaHMhHaOaCNaEMhOa8AaCNaAMhAdnadTmbcbhqarhkinaqhDdnarTmbakydbhDkdnalaDax2cdtfIdbg3aeaDam2cdtfgDIdwaH:tgQaQNaDIdbaA:tgCaCNaDIdlaO:tgXaXNMMg5:rgEMg8EaK9ETmbJbbbbh8Adna5Jbbbb9ETmba8EaK:taEaEM:vh8Aka8AaQNaHMhHa8AaXNaOMhOa8AaCNaAMhAa3aKaEMMJbbbZNhKkakclfhkadaqcefgq9hmbkkabaKUdxabaHUdwabaOUdlabaAUdbawcjef8Kjjjjbk:reevu8Jjjjjbcj8W9Rgr8Kjjjjbaici2hwcbhDdnaiTmbarhiawhqinaiaeadRbbgkcdtfydbBdbaDakcefgkaDak0EhDaiclfhiadcefhdaqcufgqmbkkabarawaeaDalaoz:jjjjbarcj8Wf8Kjjjjbk:Eeeeu8Jjjjjbca9Rgo8Kjjjjbab9cb83dyab9cb83daab9cb83dKab9cb83dzab9cb83dwab9cb83dbdnadTmbaocbBd3ao9cb83iwao9cb83ibaoaeadaialaoc3falEavcbalEcrcbz:kjjjbabao8Pib83dbabao8Piw83dwkaocaf8Kjjjjbk::meQu8Jjjjjbcjz9Rgv8KjjjjbcbhoavcjPfcbaez:rjjjb8Aavcjxfcbaez:rjjjb8AdnaiTmbadhoaihrinavcjxfaoRbbfgwawRbbcef86bbavcjxfaocefRbbfgwawRbbcef86bbavcjxfaocdfRbbfgwawRbbcef86bbaocifhoarcufgrmbkcbhDcjehoadhqcehkindndnalTmbcbhxcuhmaqhrakhwcuhPinawcufamaoavcjPfarcefRbbgsfRbb9RcFeGgzci6aoavcjPfarRbbgHfRbb9RcFeGgOci6faoavcjPfarcdfRbbgAfRbb9RcFeGgCci6fgXcOtaOcFr7azaCf9RcwtVavcjxfaAfRbbgzavcjxfaHfRbbgHavcjxfasfRbbgsaHas6Egsazas6EcFe7VgsaP9kgzEhmaXcd6gHaxcefgOal9iVce9hmdasaPazEhPaxaOaHEhxarcifhrawai6hsawcefhwasmbxdkkcuhmaqhrakhwcuhxinawcufamaoavcjPfarcefRbbfRbb9RcFeGci6aoavcjPfarRbbfRbb9RcFeGci6faoavcjPfarcdfRbbfRbb9RcFeGci6fgPax9kgsEhmaPce0meaPaxasEhxarcifhrawai6hPawcefhwaPmbkkadamci2fgrcdfRbbhwarcefRbbhxarRbbhPadaDci2fgrcifaramaD9Rci2zNjjjb8AaPavcjPffaocefgo86bbaPavcjxffgmamRbbcuf86bbaxavcjPffao86bbaxavcjxffgmamRbbcuf86bbarcdfaw86bbarcefax86bbaraP86bbawavcjPffao86bbawavcjxffgrarRbbcuf86bbaqcifhqakcefhkaDcefgDai9hmbkcbhzdnalcb9mmbcbhsavcjPfcbaez:rjjjb8Aadcvfhlinadasci2fgxcefgDRbbhoaxcdfgqRbbhrdndnavcjPfaxRbbgmfRbbmbavcjPfarfRbbhwdndndnavcjPfaofRbbTmbawcFeGTmexikawcFeGmdascefgAai9pmdasc980mdascifhQcbhLarcFeGhCamcFeGhXalhwcbhKcbhYinawcufRbbhPawRbbhOcehkdndnawc9:fRbbgHao9hmbaPcFeGamSmekdnaPcFeGao9hmbaOcFeGamSmekaHamSaOcFeGaoSGhkkceh8AaYceGhYdndnaHar9hmbaPcFeGaoSmekdnaPcFeGar9hmbaOcFeGaoSmekaHaoSaOcFeGarSGh8AkakaYVhYaLaHcFeGgHaXSaPcFeGgPaCSGaPaXSaOcFeGgPaCSGVaHaCSaPaXSGVVhLa8AaKceGVhKdnaAcefgPai9pmbawcifhwaAaQ6hHaPhAaHmekkaYTmeaKmekarhwaohPaohHarhOamhrxdkdnaYTaLVceGTmbaYaKTVaLVceGmekamhwarhParhHamhOaohrxekaohwamhPamhHaohOkavcjPfarfce86bbavcjPfawfce86bbaxaH86bbaqar86bbaDaO86bbavcjPfaPfce86bbalcifhlascefgsai9hmbkkavcFeaecetz:rjjjbhwaici2hrindnawadRbbgmcetfgx8Uebgocu9kmbaxaz87ebawcjlfazcdtfabamcdtfydbBdbazhoazcefhzkadao86bbadcefhdarcufgrmbkazcdthokabavcjlfaoz:qjjjb8Aavcjzf8KjjjjbkObabaiaeadcbz:njjjbk9teiucbcbyd;8:G:cjbgeabcifc98GfgbBd;8:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;8:G:cjbgeabcrfc94GfgbBd;8:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikTeeucbabcbyd;8:G:cjbge9Rcifc98GaefgbBd;8:G:cjbdnabZbcztge9nmbabae9RcFFifcz4nb8Akk:3qeludndnadch6mbadTmeabaead;8qbbabskabaeSmbdnaeadabfgi9Rcbadcet9R0mbadTmeabaead;8qbbabskaeab7ciGhldndndnabae9pmbdnalTmbadhvabhixikdnabciGmbadhvabhixdkadTmiabaeRbb86bbadcufhvdnabcefgiciGmbaecefhexdkavTmiabaeRbe86beadc9:fhvdnabcdfgiciGmbaecdfhexdkavTmiabaeRbd86bdadc99fhvdnabcifgiciGmbaecifhexdkavTmiabaeRbi86biabclfhiaeclfheadc98fhvxekdnalmbdnaiciGTmbadTmlabadcufgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc9:fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc99fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc98fgdfaeadfRbb86bbkadcl6mbdnadc98fgocxGcxSmbaocd4cefciGhiaec98fhlabc98fhvinavadfaladfydbBdbadc98fhdaicufgimbkkaocx6mbaec9Wfhvabc9WfhoinaoadfgicxfavadfglcxfydbBdbaicwfalcwfydbBdbaiclfalclfydbBdbaialydbBdbadc9Wfgdci0mbkkadTmdadhidnadciGglTmbaecufhvabcufhoadhiinaoaifavaifRbb86bbaicufhialcufglmbkkadcl6mdaec98fhlabc98fhvinavaifgecifalaifgdcifRbb86bbaecdfadcdfRbb86bbaecefadcefRbb86bbaeadRbb86bbaic98fgimbxikkavcl6mbdnavc98fglc3Gc3Smbavalcd4cefcrGgdcdt9RhvinaiaeydbBdbaeclfheaiclfhiadcufgdmbkkalc36mbinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfaeczfydbBdbaicCfaecCfydbBdbaicKfaecKfydbBdbaic3faec3fydbBdbaecafheaicafhiavc9Gfgvci0mbkkavTmbdndnavcrGgdmbavhlxekavc94GhlinaiaeRbb86bbaicefhiaecefheadcufgdmbkkavcw6mbinaiaeRbb86bbaicefaecefRbb86bbaicdfaecdfRbb86bbaicifaecifRbb86bbaiclfaeclfRbb86bbaicvfaecvfRbb86bbaicofaecofRbb86bbaicrfaecrfRbb86bbaicwfhiaecwfhealc94fglmbkkabkk:pedbcj:GdktFFuuFFuuFFuubbbbFFuFFFuFFFuFbbbbbbjZbbbbbbbbbbbbbbjZbbbbbbbbbbbbbbjZ86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;bc;0:Gdkxebbbdbbbj:qbb";
  var wasmpack = new Uint8Array([
    32,
    0,
    65,
    2,
    1,
    106,
    34,
    33,
    3,
    128,
    11,
    4,
    13,
    64,
    6,
    253,
    10,
    7,
    15,
    116,
    127,
    5,
    8,
    12,
    40,
    16,
    19,
    54,
    20,
    9,
    27,
    255,
    113,
    17,
    42,
    67,
    24,
    23,
    146,
    148,
    18,
    14,
    22,
    45,
    70,
    69,
    56,
    114,
    101,
    21,
    25,
    63,
    75,
    136,
    108,
    28,
    118,
    29,
    73,
    115
  ]);
  if (typeof WebAssembly !== "object") {
    return {
      supported: false
    };
  }
  var instance;
  var ready = WebAssembly.instantiate(unpack(wasm), {}).then(function(result) {
    instance = result.instance;
    instance.exports.__wasm_call_ctors();
  });
  function unpack(data) {
    var result = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
      var ch = data.charCodeAt(i);
      result[i] = ch > 96 ? ch - 97 : ch > 64 ? ch - 39 : ch + 4;
    }
    var write = 0;
    for (var i = 0; i < data.length; ++i) {
      result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
    }
    return result.buffer.slice(0, write);
  }
  function assert(cond) {
    if (!cond) {
      throw new Error("Assertion failed");
    }
  }
  function bytes(view) {
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  }
  var BOUNDS_SIZE = 48;
  var MESHLET_SIZE = 16;
  function extractMeshlet(buffers, index) {
    var vertex_offset = buffers.meshlets[index * 4 + 0];
    var triangle_offset = buffers.meshlets[index * 4 + 1];
    var vertex_count = buffers.meshlets[index * 4 + 2];
    var triangle_count = buffers.meshlets[index * 4 + 3];
    return {
      vertices: buffers.vertices.subarray(vertex_offset, vertex_offset + vertex_count),
      triangles: buffers.triangles.subarray(triangle_offset, triangle_offset + triangle_count * 3)
    };
  }
  function buildMeshlets(fun, indices, vertex_positions, vertex_count, vertex_positions_stride, max_vertices, min_triangles, max_triangles, parama, paramb) {
    var sbrk = instance.exports.sbrk;
    var max_meshlets = instance.exports.meshopt_buildMeshletsBound(indices.length, max_vertices, min_triangles);
    var meshletsp = sbrk(max_meshlets * MESHLET_SIZE);
    var meshlet_verticesp = sbrk(indices.length * 4);
    var meshlet_trianglesp = sbrk(indices.length);
    var indicesp = sbrk(indices.byteLength);
    var verticesp = sbrk(vertex_positions.byteLength);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(indices), indicesp);
    heap.set(bytes(vertex_positions), verticesp);
    var count = fun(
      meshletsp,
      meshlet_verticesp,
      meshlet_trianglesp,
      indicesp,
      indices.length,
      verticesp,
      vertex_count,
      vertex_positions_stride,
      max_vertices,
      min_triangles,
      max_triangles,
      parama,
      paramb
    );
    heap = new Uint8Array(instance.exports.memory.buffer);
    var meshletBytes = heap.subarray(meshletsp, meshletsp + count * MESHLET_SIZE);
    var meshlets = new Uint32Array(meshletBytes.buffer, meshletBytes.byteOffset, meshletBytes.byteLength / 4).slice();
    for (var i = 0; i < count; ++i) {
      var vertex_offset = meshlets[i * 4 + 0];
      var triangle_offset = meshlets[i * 4 + 1];
      var vertex_count = meshlets[i * 4 + 2];
      var triangle_count = meshlets[i * 4 + 3];
      instance.exports.meshopt_optimizeMeshlet(
        meshlet_verticesp + vertex_offset * 4,
        meshlet_trianglesp + triangle_offset,
        triangle_count,
        vertex_count
      );
    }
    var used_vertices = count ? meshlets[(count - 1) * 4 + 0] + meshlets[(count - 1) * 4 + 2] : 0;
    var used_triangles = count ? meshlets[(count - 1) * 4 + 1] + meshlets[(count - 1) * 4 + 3] * 3 : 0;
    var result = {
      meshlets,
      vertices: new Uint32Array(heap.buffer, meshlet_verticesp, used_vertices).slice(),
      triangles: new Uint8Array(heap.buffer, meshlet_trianglesp, used_triangles).slice(),
      meshletCount: count
    };
    sbrk(meshletsp - sbrk(0));
    return result;
  }
  function extractBounds(boundsp) {
    var bounds_floats = new Float32Array(instance.exports.memory.buffer, boundsp, BOUNDS_SIZE / 4);
    return {
      centerX: bounds_floats[0],
      centerY: bounds_floats[1],
      centerZ: bounds_floats[2],
      radius: bounds_floats[3],
      coneApexX: bounds_floats[4],
      coneApexY: bounds_floats[5],
      coneApexZ: bounds_floats[6],
      coneAxisX: bounds_floats[7],
      coneAxisY: bounds_floats[8],
      coneAxisZ: bounds_floats[9],
      coneCutoff: bounds_floats[10]
    };
  }
  function computeMeshletBounds(buffers, vertex_positions, vertex_count, vertex_positions_stride) {
    var sbrk = instance.exports.sbrk;
    var results = [];
    var verticesp = sbrk(vertex_positions.byteLength);
    var meshlet_verticesp = sbrk(buffers.vertices.byteLength);
    var meshlet_trianglesp = sbrk(buffers.triangles.byteLength);
    var resultp = sbrk(BOUNDS_SIZE);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(vertex_positions), verticesp);
    heap.set(bytes(buffers.vertices), meshlet_verticesp);
    heap.set(bytes(buffers.triangles), meshlet_trianglesp);
    for (var i = 0; i < buffers.meshletCount; ++i) {
      var vertex_offset = buffers.meshlets[i * 4 + 0];
      var triangle_offset = buffers.meshlets[i * 4 + 1];
      var triangle_count = buffers.meshlets[i * 4 + 3];
      instance.exports.meshopt_computeMeshletBounds(
        resultp,
        meshlet_verticesp + vertex_offset * 4,
        meshlet_trianglesp + triangle_offset,
        triangle_count,
        verticesp,
        vertex_count,
        vertex_positions_stride
      );
      results.push(extractBounds(resultp));
    }
    sbrk(verticesp - sbrk(0));
    return results;
  }
  function computeClusterBounds(indices, vertex_positions, vertex_count, vertex_positions_stride) {
    var sbrk = instance.exports.sbrk;
    var resultp = sbrk(BOUNDS_SIZE);
    var indicesp = sbrk(indices.byteLength);
    var verticesp = sbrk(vertex_positions.byteLength);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(indices), indicesp);
    heap.set(bytes(vertex_positions), verticesp);
    instance.exports.meshopt_computeClusterBounds(resultp, indicesp, indices.length, verticesp, vertex_count, vertex_positions_stride);
    var result = extractBounds(resultp);
    sbrk(resultp - sbrk(0));
    return result;
  }
  function computeSphereBounds(positions, count, positions_stride, radii, radii_stride) {
    var sbrk = instance.exports.sbrk;
    var resultp = sbrk(BOUNDS_SIZE);
    var positionsp = sbrk(positions.byteLength);
    var radiip = radii ? sbrk(radii.byteLength) : 0;
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(bytes(positions), positionsp);
    if (radii) {
      heap.set(bytes(radii), radiip);
    }
    instance.exports.meshopt_computeSphereBounds(resultp, positionsp, count, positions_stride, radiip, radii ? radii_stride : 0);
    var result = extractBounds(resultp);
    sbrk(resultp - sbrk(0));
    return result;
  }
  return {
    ready,
    supported: true,
    buildMeshlets: function(indices, vertex_positions, vertex_positions_stride, max_vertices, max_triangles, cone_weight) {
      assert(indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(max_vertices >= 3 && max_vertices <= 256);
      assert(max_triangles >= 1 && max_triangles <= 512);
      cone_weight = cone_weight || 0;
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      return buildMeshlets(
        instance.exports.meshopt_buildMeshletsFlex,
        indices32,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride * 4,
        max_vertices,
        max_triangles,
        max_triangles,
        cone_weight,
        0
      );
    },
    buildMeshletsFlex: function(indices, vertex_positions, vertex_positions_stride, max_vertices, min_triangles, max_triangles, cone_weight, split_factor) {
      assert(indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(max_vertices >= 3 && max_vertices <= 256);
      assert(min_triangles >= 1 && max_triangles <= 512);
      assert(min_triangles <= max_triangles);
      cone_weight = cone_weight || 0;
      split_factor = split_factor || 0;
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      return buildMeshlets(
        instance.exports.meshopt_buildMeshletsFlex,
        indices32,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride * 4,
        max_vertices,
        min_triangles,
        max_triangles,
        cone_weight,
        split_factor
      );
    },
    buildMeshletsSpatial: function(indices, vertex_positions, vertex_positions_stride, max_vertices, min_triangles, max_triangles, fill_weight) {
      assert(indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(max_vertices >= 3 && max_vertices <= 256);
      assert(min_triangles >= 1 && max_triangles <= 512);
      assert(min_triangles <= max_triangles);
      fill_weight = fill_weight || 0;
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      return buildMeshlets(
        instance.exports.meshopt_buildMeshletsSpatial,
        indices32,
        vertex_positions,
        vertex_positions.length / vertex_positions_stride,
        vertex_positions_stride * 4,
        max_vertices,
        min_triangles,
        max_triangles,
        fill_weight
      );
    },
    extractMeshlet: function(buffers, index) {
      assert(index >= 0 && index < buffers.meshletCount);
      return extractMeshlet(buffers, index);
    },
    computeClusterBounds: function(indices, vertex_positions, vertex_positions_stride) {
      assert(indices.length % 3 == 0);
      assert(indices.length / 3 <= 512);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      return computeClusterBounds(indices32, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4);
    },
    computeMeshletBounds: function(buffers, vertex_positions, vertex_positions_stride) {
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      return computeMeshletBounds(buffers, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4);
    },
    computeSphereBounds: function(positions, positions_stride, radii, radii_stride) {
      assert(positions instanceof Float32Array);
      assert(positions.length % positions_stride == 0);
      assert(positions_stride >= 3);
      assert(!radii || radii instanceof Float32Array);
      assert(!radii || radii.length % radii_stride == 0);
      assert(!radii || radii_stride >= 1);
      assert(!radii || positions.length / positions_stride == radii.length / radii_stride);
      radii_stride = radii_stride || 0;
      return computeSphereBounds(positions, positions.length / positions_stride, positions_stride * 4, radii, radii_stride * 4);
    }
  };
})();

// node_modules/meshoptimizer/meshopt_tangents.js
var MeshoptTangents = (function() {
  var wasm = "b9H79Tebbbe9vx9Geueu9Geub9Gbb9Gkuuuuuuuuuuub9Gouuuuuub9Gwuuuuuu9999b9Giuuueu9Ge98e999Gvuuuuueu9Gd99ueu9Ge99e999Gd98ue98isPdilvboberrwDqklve9Weiiviebeoweuecj:Gdkr9Avo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbK9TW79O9V9Wt9F9NW9UWV9HtW9u9H9U9NW9Ut7beL9TW79O9V9Wt9F9NW9UWV9HtW9o9VV9T9H27bil79IV9RblDwebcekdorq;X9PPdbk;e8EvHuw99euv99wu8Jjjjjbc;Wb9Rgk8Kjjjjbakcxfcbc;Kbz:fjjjb8AakcualcdtalcFFFFi0Ecbyd:W:2:cjbHjjjjbbgxBdxakceBd2adci9Uhmalcd4alfhPcehsinasgzcethsazaP6mbkakcuazcdtgsazcFFFFi0Ecbyd:W:2:cjbHjjjjbbgPBdzakcdBd2aPcFeasz:fjjjbhHaDcd4hOarcd4hAavcd4hCdnalTmbazcufhrcbhvindndnaHcbaiavaC2cdtfgzydlgDaDcjjjj94SEgPcH4cbaoavaA2cdtfgsydlgXcs4aXcjjjj94SE7aP7c:F:b:DD2cbazydbgQaQcjjjj94SEgPcH4cbasydbgLcs4aLcjjjj94SE7aP7c;D;O:B8J27cbazydwgKaKcjjjj94SEgzcH4cbasydwgYcs4aYcjjjj94SE7az7c:3F;N8N27awavaO2cdtfgzydlg8AazydbgE7cFFFFrGgzcm4az7c:fjjK27arGgPcdtfgzydbgscuSmba8A::h3aE::h5aY::h8EaX::h8FaL::haaK::hhaD::hgaQ::h8JcehDinaDhzdnaiasaC2cdtfgDIdba8J9CmbaDIdlag9CmbaDIdwah9CmbaoasaA2cdtfgDIdbaa9CmbaDIdla8F9CmbaDIdwa8E9CmbawasaO2cdtfgDIdba59CmbaDIdla39BmikazcefhDaHaPazfarGgPcdtfgzydbgscu9hmbkkazavBdbavhskaxavcdtfasBdbavcefgval9hmbkkcbhPaHcbyd:0:2:cjbH:bjjjbbakceBd2ak9cb83ibakaeadaxalakcxfz:cjjjbcuamcltadcFFFFd0Ecbyd:W:2:cjbHjjjjbbh8Kakcxfakyd2gKcdtfa8KBdbakaKcefgYBd2dnadci6mbaehsa8KhzamhvindndnaeTmbascwfydbhDasclfydbhHasydbhrxekaPcdfhDaPcefhHaPhrkJbbbbh8JJbbbbJbbbbJbbbbJbbbbJbbjZJbbj:;awaHaO2cdtfgXIdbawaraO2cdtfgQIdbga:tawaDaO2cdtfgLIdlaQIdlgh:tggNaXIdlah:tghaLIdbaa:tN:tgaJbbbb9EEaaJbbbb9BEg5aiaraC2cdtfgrIdwgaaiaHaC2cdtfgHIdwg39BEa5arIdlg8FaHIdlg8L9BEa5arIdbg8EaHIdbg8M9BEg5aaaiaDaC2cdtfgDIdwg8N9BEa5a8FaDIdlgy9BEa5a8EaDIdbg8P9BEg5a3a8N9BEa5a8Lay9BEa5a8Ma8P9BEh5dnaga3aa:tNaha8Naa:tN:tgaaaNaga8Ma8E:tNaha8Pa8E:tN:tg8Ea8ENaga8La8F:tNahaya8F:tN:tggagNMMghJbbbb9Bmba5ah:r:vh8Jkazcxfa5Udbazcwfaaa8JNUdbazclfaga8JNUdbaza8Ea8JNUdbascxfhsazczfhzaPcifhPavcufgvmbkkcbhzakcxfaYcdtfcuadcdtadcFFFFi0Ecbyd:W:2:cjbHjjjjbbgDBdbakaKcdfgPBd2dnadTmbaDhsinasazBdbasclfhsadazcefgz9hmbkkakcxfaPcdtfcuamcdtadcFFFF970Ecbyd:W:2:cjbHjjjjbbgvBdbakaKcifgzBd2akcxfazcdtfamcbyd:W:2:cjbHjjjjbbgYBdbakaKclfBd2dnadci6mba8KcxfhsavhPcbhzinaPazBdbaYazfcdcbasIdbg8JJbbbb9DEa8JJbbbb9EV86bbaPclfhPasczfhsamazcefgz9hmbkkdnalTmbcbhIakydlh8Rakydbh8SinaIcdthzdna8SaIcefgIcdtfydbgsa8SazfydbgzSmbasaz9RhQa8RazcdtfhLcbhRinaLaRcdtfg8Uydbgzcd4g8Vci2g8WazciGcdtgsyd:e:G:cjbfhza8Wasydj:G:cjbfhsdnaeTmbaeazcdtfydbhzaeascdtfydbhskdnaRcefgRaQ9pmbaxazcdtfydbhKaxascdtfydbhEaYa8Vfh8Aava8Vcdtfh8XaRhwinaLawcdtfgXydbgzcd4gsci2gOazciGcdtgzyd:e:G:cjbfhPaOazydj:G:cjbfhzdnaeTmbaeaPcdtfydbhPaeazcdtfydbhzkdndnaxazcdtfydbaKSmbaxaPcdtfydbaE9hmekaYasfRbbgza8ARbbgPVciSmbdnazaPGmba8VhPdna8Va8XydbgzSmba8XhHinaHavazgPcdtfgrydbgzBdbarhHaPaz9hmbkkdnasavascdtfgHydbgzSmbinaHavazgscdtfgrydbgzBdbarhHasaz9hmbkkaPasSmbaYasfgHRbbaYaPfgzRbbVciSmeavascdtfaPBdbazazRbbaHRbbV86bbkdna8UydbciGa8WfgsaDascdtfgPydbgzSmbinaPaDazgscdtfgHydbgzBdbaHhPasaz9hmbkkdnaXydbciGaOfgPaDaPcdtfgHydbgzSmbinaHaDazgPcdtfgrydbgzBdbarhHaPaz9hmbkkasaPSmbaDaPcdtfasBdbkawcefgwaQ9hmbkkaRaQ9hmbkkaIal9hmbkkdnadTmbcbhrinarhsdnaraDarcdtfgwydbgzSmbawhPinaPaDazgscdtfgHydbgzBdbaHhPasaz9hmbkkawasBdbarcefgrad9hmbkcbh8Vabcbadcltz:fjjjbhQdnadci6mbaqceGhKaDhLaeh8Acbh8Windna8Ka8WcltfgPIdxJbbbb9Bmbaea8Wci2gEcdtfhXcbhsa8VhwinaQaLasfydbcltfhzdndnaeTmba8AasfydbhHaXasc:e:G:cjbfydbcdtfydbhOaXascj:G:cjbfydbcdtfydbhxxekasc:e:G:cjbfydbaEfhOascj:G:cjbfydbaEfhxawhHkazaPIdbghaoaHaA2cdtfgrIdbg8JaPIdwg8EarIdwggNaha8JNaPIdlg5arIdlghNMMgaN:tg8FJbbbbJbbjZa8EagaaN:tg8Ea8ENa8Fa8FNa5ahaaN:tgaaaNMMg8F:r:va8FJbbbb9BEJ;As6nJbbjZaiaxaC2cdtfgrIdwaiaHaC2cdtfgHIdwg3:tg8Faga8FagNarIdbaHIdbg8L:tg8Ma8JNaharIdlaHIdlg8N:tgyNMMg8FN:tg5aiaOaC2cdtfgHIdwa3:tg3aga3agNaHIdba8L:tg8Pa8JNahaHIdla8N:tg8NNMMg3N:tggNa8Ma8Ja8FN:tg8La8Pa8Ja3N:tg8JNayaha8FN:tg8Fa8Naha3N:tghNMMJbbbbJbbjZa5a5Na8La8LNa8Fa8FNMMagagNa8Ja8JNahahNMMNg8J:rgg:va8JJbbbb9BENgh:lg8Ja8JJbbjZ9EEg8Ja8JJ7;A9s89NJ:L9t9s::MNJ;ob;jZMJbbjZa8J:t:rNg8J:ta8JahJbbbb9DENg8Jaga8JNaKEg8JNazIdbMUdbazaaa8JNazIdlMUdlaza8Ea8JNazIdwMUdwawcefhwasclfgscx9hmbkkaLcxfhLa8Acxfh8Aa8Vcifh8Va8Wcefg8Wam9hmbkcbhrinarhsdnaravarcdtfgPydbgzSmbinaPavazgscdtfgHydbgzBdbaHhPasaz9hmbkkaQarc8W2fgzc3fJbbjZJbbj:;aYasfRbbceGEg8JUdbazc8Sfa8JUdbaza8JUdxarcefgram9hmbkkaqcdGhvcbhsaDhPaQhzindnasaPydb9hmbdndnazcwfgHIdbg8Ja8JNazIdbggagNazclfgrIdbghahNMMgaJbbbb9BmbaHa8JJbbjZaa:r:vgaNUdbarahaaNUdbazagaaNg8JUdbxekaHa8JJbbbbNUdbarahJbbbbNUdbazagJbbbbNg8JUdba8JJbbjZavEh8Jkaza8JUdbkaPclfhPazczfhzadascefgs9hmbkcbhzaQhsindnazaDydbgPSmbasaQaPcltfgPydwBdwasaP8Pdb83dbkaDclfhDasczfhsadazcefgz9hmbkkdnakyd2gsTmbascdtakcxffc98fhzinazydbcbyd:0:2:cjbH:bjjjbbazc98fhzascufgsmbkkakc;Wbf8Kjjjjbk;:levucualcefgocdtaocFFFFi0Ecbyd:W:2:cjbHjjjjbbhoavavyd9GgrcdtfaoBdbavarcefBd9GabaoBdbcuadcdtadcFFFFi0Ecbyd:W:2:cjbHjjjjbbhoavavyd9GgrcdtfaoBdbavarcefBd9GabaoBdlabydbclfcbalcdtz:fjjjbhoadci9UhwdnadTmbdnaeTmbaehvadhrinaoaiavydbcdtfydbcdtfgDaDydbcefBdbavclfhvarcufgrmbxdkkadhraihvinaoavydbcdtfgDaDydbcefBdbavclfhvarcufgrmbkkdnalTmbcbhraohvinavydbhDavarBdbavclfhvaDarfhralcufglmbkkdnadci6mbabydlhrcbhlcdhvindndnaeTmbaiaealfgqydbcdtfhDaiaqcwfydbcdtfhdaiaqclfydbcdtfhqxekaialfgDcwfhdaDclfhqkadydbhdaqydbhqaoaDydbcdtfgDaDydbgDcefBdbaraDcdtfavc9:fBdbaoaqcdtfgDaDydbgDcefBdbaraDcdtfavcufBdbaoadcdtfgDaDydbgDcefBdbaraDcdtfavBdbalcxfhlavclfhvawcufgwmbkkabydbcbBdbk:SEvxui99duv99xu8Jjjjjbc;Wb9Rgw8Kjjjjbawcxfcbc;Kbz:fjjjb8AawcualcdtalcFFFFi0Ecbyd:W:2:cjbHjjjjbbgDBdxawceBd2adci9Uhqalcd4alfhkaoz:mjjjbhocehxinaxgmcethxamak6mbkawcuamcdtgxamcFFFFi0Ecbyd:W:2:cjbHjjjjbbgkBdzawcdBd2akcFeaxz:fjjjbhPavcd4hsdnalTmbamcufhzcbhHindndnaPcbaiaHas2cdtfgmydlgvavcjjjj94SEgxcH4ax7c:F:b:DD2cbamydbgOaOcjjjj94SEgxcH4ax7c;D;O:B8J27cbamydwgAaAcjjjj94SEgmcH4am7c:3F;N8N27azGgkcdtfgmydbgxcuSmbaA::hCav::hXaO::hQcehvinavhmdnaiaxas2cdtfgvIdbaQ9CmbavIdlaX9CmbavIdwaC9BmikamcefhvaPakamfazGgkcdtfgmydbgxcu9hmbkkamaHBdbaHhxkaDaHcdtfaxBdbaHcefgHal9hmbkkcbhkaPcbyd:0:2:cjbH:bjjjbbawceBd2aw9cb83ibawaeadaDalawcxfz:cjjjbcuaqcltadcFFFFd0Ecbyd:W:2:cjbHjjjjbbhLawcxfawyd2gKcdtfaLBdbawaKcefgOBd2dnadci6mbaehxaLhmaqhHindndnaeTmbaxcwfydbhzaxclfydbhvaxydbhPxekakcdfhzakcefhvakhPkJbbbbhQdnaiavas2cdtfgvIdbaiaPas2cdtfgPIdbgX:tgYaiazas2cdtfgzIdlaPIdlgC:tg8ANavIdlaC:tgCazIdbaX:tgEN:tgXaXNaCazIdwaPIdwg3:tg5NavIdwa3:tg3a8AN:tgCaCNa3aENaYa5N:tgYaYNMMg8AJbbbb9BmbJbbjZa8A:r:vhQkamcxfa8AJbbbb9CBdbamcwfaXaQNUdbamclfaYaQNUdbamaCaQNUdbaxcxfhxamczfhmakcifhkaHcufgHmbkkcbhmawcxfaOcdtfcuadcdtg8EadcFFFFi0Ecbyd:W:2:cjbHjjjjbbgvBdbawaKcdfg8FBd2dnadTmbavhxinaxamBdbaxclfhxadamcefgm9hmbkkdnalTmbcbhaawydlhhawydbhginaacdthmdnagaacefgacdtfydbgxagamfydbgmSmbaxam9RhAahamcdtfh8Jcbh8Kina8Ja8Kcdtfg8Lydbgmcd4gkci2g8MamciGcdtgxyd:e:G:cjbfhma8Maxydj:G:cjbfhxdnaeTmbaeamcdtfydbhmaeaxcdtfydbhxkdna8Kcefg8KaA9pmbaLakcltfhOaDamcdtfydbh8NaDaxcdtfydbhya8KhHina8JaHcdtfg8Pydbgmcd4gkci2gzamciGgPcdtgmyd:e:G:cjbfhxazamydj:G:cjbfhmdnaeTmbaeaxcdtfydbhxaeamcdtfydbhmkdndnaDamcdtfydba8NSmbaDaxcdtfydbay9hmekaOIdwaLakcltfgmIdwNaOIdbamIdbNaOIdlamIdlNMMao9ETmbaOydxamydx9hmbdna8LydbciGa8MfgxavaxcdtfgkydbgmSmbinakavamgxcdtfgPydbgmBdbaPhkaxam9hmbka8PydbciGhPkdnaPazfgkavakcdtfgPydbgmSmbinaPavamgkcdtfgzydbgmBdbazhPakam9hmbkkaxakSmbavakcdtfaxBdbkaHcefgHaA9hmbkka8KaA9hmbkkaaal9hmbkkdndndnadTmbcbhzinazhxdnazavazcdtfgHydbgmSmbaHhkinakavamgxcdtfgPydbgmBdbaPhkaxam9hmbkkaHaxBdbazcefgzad9hmbkcbh8Mabcbadcx2z:fjjjbh8Padcd9nmeavhAaeh8NcbhyinaLaycltfhkaeayci2g8JcdtfhDcbhxa8MhHina8PaAaxfydbcx2fhmdndnaeTmba8NaxfydbhzaDaxc:e:G:cjbfydbcdtfydbhOaDaxcj:G:cjbfydbcdtfydbhPxekaxc:e:G:cjbfydba8JfhOaxcj:G:cjbfydba8JfhPaHhzkamakIdbaiaPas2cdtfgPIdwaiazas2cdtfgzIdwgC:tgoaoNaPIdbazIdbgY:tgQaQNaPIdlazIdlg8A:tgXaXNMMaiaOas2cdtfgPIdwaC:tgCaCNaPIdbaY:tgYaYNaPIdla8A:tg8Aa8ANMMNgE:rg3J;As6nJbbjZaoaCNaQaYNaXa8ANMMJbbbbJbbjZa3:vaEJbbbb9BENgQ:lgoaoJbbjZ9EEgoaoJ7;A9s89NJ:L9t9s::MNJ;ob;jZMJbbjZao:t:rNgo:taoaQJbbbb9DENgoNamIdbMUdbamakIdlaoNamIdlMUdlamakIdwaoNamIdwMUdwaHcefhHaxclfgxcx9hmbkaAcxfhAa8Ncxfh8Na8Mcifh8MaycefgyaqSmdxbkkabcbadcx2z:fjjjb8Axekcbhxavhka8Phmindnaxakydb9hmbJbbbbhodnamcwfgPIdbgQaQNamIdbgXaXNamclfgzIdbgCaCNMMgYJbbbb9BmbJbbjZaY:r:vhokaPaQaoNUdbazaCaoNUdbamaXaoNUdbkakclfhkamcxfhmadaxcefgx9hmbkkdnarJbbbb9ETmbawcxfa8Fcdtfcuadcltg8Pa8EcFFFFi0Ecbyd:W:2:cjbHjjjjbbg8JBdbdndnar:ngo:lJbbb9p9DTmbao:Ohmxekcjjjj94hmkaKcifh8Famce9imbamcqamcq9iEh8Nadci6hLcbhAina8Jcba8Pz:fjjjbhPdnaLmbcbhDavhOinavaDcx2fhecbhxinabaOaxfydbgzcx2fgmIdwhoabaeaxcj:G:cjbfydbcdtfydbgHcx2fgkIdwhQamIdbhXakIdbhCamIdlhYakIdlh8AaPazcltfgmamIdxJbbjZMUdxamamIdbaCaX:taoaQNaXaCNaYa8ANMMgXaXNJbbbbaXJbbbb9EEgXNgCMUdbamamIdla8AaY:taXNgYMUdlamaQao:taXNgoamIdwMUdwaPaHcltfgmamIdxJbbjZMUdxamamIdbaC:tUdbamamIdlaY:tUdlamamIdwao:tUdwaxclfgxcx9hmbkaOcxfhOaDcefgDaq9hmbkkdnadTmbaraA:Z:tgoJbbjZaoJbbjZ9DEJbbbZNh8AcbhxavhkabhzaPhmindnaxakydb9hmbamcxfIdbgQJbbbb9ETmbJbbbbhodnamcwfIdba8AaQ:vgQNazcwfgPIdbMgXaXNamIdbaQNazIdbMgCaCNamclfIdbaQNazclfgHIdbMgQaQNMMgYJbbbb9BmbJbbjZaY:r:vhokaPaXaoNUdbaHaQaoNUdbazaCaoNUdbkakclfhkazcxfhzamczfhmadaxcefgx9hmbkkaAcefgAa8N9hmbkkdnadTmbcbhmabhxindnamavydbgkSmbaxabakcx2fgkydwBdwaxak8Pdb83dbkavclfhvaxcxfhxadamcefgm9hmbkkdna8FTmba8Fcdtawcxffc98fhminamydbcbyd:0:2:cjbH:bjjjbbamc98fhma8Fcufg8Fmbkkawc;Wbf8Kjjjjbk9teiucbcbyd:4:2:cjbgeabcifc98GfgbBd:4:2:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd:4:2:cjbgeabcrfc94GfgbBd:4:2:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikTeeucbabcbyd:4:2:cjbge9Rcifc98GaefgbBd:4:2:cjbdnabZbcztge9nmbabae9RcFFifcz4nb8Akk9pee98abab:Igbabab:Ige:Iab9e9P9q;U;G9c:t;58::I9e8N8Es;O:h;a9w:;:G:Iae9e9c86v;H9t9v:LZ:Iab9e:b9ExpFF;F:;:I9ebbbbbb;WZ:G:G:G:2k0ed98ababab:Ige:Igdaeae:I:Iae9e:NS87:m:h;n;g8::I9et;N;k;I;5bI:;:G:Iadae9e:Y;79U:jzH:bZ:I9e93:S;l9u9v9v;f:;:G:Iab:G:G:2k:K8Flqud98zul988Jjjjjbc:Wl9Rgv8Kjjjjbcbhoadc99fcK9Tgrcbarcb9kEgwc9O2adfhDdnalcdtc:q:G:cjbfydbgqaicufgkfgdcb9imbawak9RhxdnadTmbaqaifgdceGhmawcdtaicdt9Rc:O:G:cjbfhradc9:GhPavc;adfhdcbhoin9ebbbbbbbbhs9ebbbbbbbbhzdnaxaofgHcb9imbarc98fydb:3hzkadaz85ibdnaHcu9imbarydb:3hskadcwfas85ibadczfhdarcwfhraPaocdfgo9hmbkamTmeaxaofhxkdndnaxcb9omb9ebbbbbbbbhzxekaxcdtyd:G:G:cjb:3hzkavc;adfaocitfaz85ibkaDc9OfhOcbhdaqcbaqcb9kEhmaic;:FFFrGhHaiceGhAaicitavc;adffc9WfhPinadhxdndnaice9omb9ebbbbbbbbhzxekcbhr9ebbbbbbbbhzdnakTmbaPhdabhoinaocwf8Ribad8Rib:Iao8Ribadcwf8Rib:Iaz:G:Ghzadc9WfhdaoczfhoaHarcdfgr9hmbkaATmekabarcitf8Ribavc;adfaxakfar9Rcitf8Rib:Iaz:Ghzkavaxcitfaz85ibaPcwfhPaxcefhdaxam9hmbkaic;:FFFrGhHaiceGhCc8VaD9RhXc8WaD9RhQavc;Gifc98fgLaqcdtfhKawcdtc:G:G:cjbfhwavc;adfc94fhYavc;Gifc9Wfh8Aavc9WfhEaDc9Nfh3aqhxdninavaxcitgdf8Ribhzdnaxce9imbcbhrdndnaxce9hmbaxhdxekaxceGhmaxc;:FFFrGhPaEadfhdcbhravc;Gifhoinaoaz9ebbbbbb9W8::I;8d:3gs9ebbbbbb9W;b:Iaz:G;8dBdbaoclfadcwf8Ribas:Ggz9ebbbbbb9W8::I;8d:3gs9ebbbbbb9W;b:Iaz:G;8dBdbad8Ribas:Ghzaocwfhoadc9WfhdaParcdfgr9hmbkamTmeaxar9Rhdkavc;Gifarcdtfaz9ebbbbbb9W8::I;8d:3gs9ebbbbbb9W;b:Iaz:G;8dBdbavadcitfc94f8Ribas:GhzkazaOz:njjjbgz9ebbbbbb;aZ:I:C9ebbbbbba;a:Iaz:Ggzaz;8dg5:3:HhzdndndndndnaOce9ig8Embavc;Gifaxcdtfc98fgdadydbgdadaQ91gdaQt9RgoBdbaoaX91h8Fada5fh5xekaOmeavc;Gifaxcdtfc98fydbcL91h8Fka8Fce9imdxekcdh8Faz9ebbbbbb;GZ9Mmbcbh8Fxekcehodnaxce9imbcbhrcbhPdnaxceSmbaxceGhaaxc;:FFFrGhAcbhravc;GifhdcbhPinadydbhodndndndnaPTmbcFFFrhPxekaoTmecjjjwhPkadaPao9RBdbcbhPxekcehPkadclfgmydbhodndndndnaPmbcFFFrhPxekaoTmecjjjwhPkamaPao9RBdbcehPcbhoxekcbhPcehokadcwfhdaAarcdfgr9hmbkaaTmekavc;GifarcdtfgrydbhddndnaPTmbcFFFrhoxekcehoadTmecjjjwhokaraoad9RBdbcbhokdna8EmbcFFFihddndna3PdebdkcFFFehdkavc;Gifaxcdtfc98fgrarydbadGBdbka5cefh5a8Fcd9hmb9ebbbbbb;WZaz:Hhzcdh8Faombaz9ebbbbbb;WZaOz:njjjb:Hhzkdnaz9ebbbbbbbb9Imbdnaxaq9mmbaxaq9RgdciGhrcbhoaxhPdndnaqax9Rc980mbadc98Ghma8AaxcdtfhdcbhoaxhPinadydbadclfydbadcwfydbadcxfydbaoVVVVhoadc9WfhdaPc98fhPamc98fgmmbkarTmekaLaPcdtfhdinadydbaoVhoadc98fhdarcufgrmbkkaoTmbavc;Gifaxcdtfc98fhdinaxcufhxaOc9OfhOadydbhoadc98fhdaoTmbxlkkaKhdaxhPinaPcefhPadydbhoadc98fhdaoTmbkaYaiaxfcitfhminavc;adfaxaifgAcitfawaxcefgxcdtfydb:385ibdndnaice9omb9ebbbbbbbbhzxekcbhr9ebbbbbbbbhzdnakTmbamhdabhoinaocwf8Ribad8Rib:Iao8Ribadcwf8Rib:Iaz:G:Ghzadc9WfhdaoczfhoaHarcdfgr9hmbkaCTmekabarcitf8Ribavc;adfaAar9Rcitf8Rib:Iaz:Ghzkavaxcitfaz85ibamcwfhmaxaP9imbkaPhxxekkdndnazcKaD9Rz:njjjbgz9ebbbbbb9Wc9MTmbavc;Gifaxcdtfaz9ebbbbbb9W8::I;8dgd:39ebbbbbb9W;b:Iaz:G;8dBdbaxcefhxaDhOxekaz;8dhdkavc;GifaxcdtfadBdbkdnaxcb9imb9ebbbbbb;WZaOz:njjjbhzdndnaxceGTmbaxhoxekavaxcitfazavc;Gifaxcdtfydb:3:I85ibaxcufhoaz9ebbbbbb9W8::IhzkdnaxTmbaocefhraocdtavc;Giffc98fhdaocitavfc94fhoinaoaz9ebbbbbb9W8::Igsadydb:3:I85ibaocwfazadclfydb:3:I85ibadc94fhdaoc9Wfhoas9ebbbbbb9W8::Ihzarc9:fgrmbkkavaxcitfhHaxhdindndnaqaxadgi9RgAaqaA9iEgdcb9omb9ebbbbbbbbhzxekadcefgociGhrdndnadci9pmbcbhd9ebbbbbbbbhzxekcbhPcbaoc98G9Rhm9ebbbbbbbbhzcbhdinadc1:2:cjbf8RibaHadfgocKf8Rib:Iadcj:2:cjbf8Ribaoczf8Rib:Iadc;4:1:cjbf8Ribaocwf8Rib:Iadc;W:1:cjbf8Ribao8Rib:Iaz:G:G:G:GhzadcafhdamaPc98fgP9hmbkarTmecbaP9Rhdkadcithdinadc;W:1:cjbf8RibaHadf8Rib:Iaz:Ghzadcwfhdarcufgrmbkkavc:GefaAcitfaz85ibaHc94fhHaicufhdaicb9kmbkkdndndndndnalPleddblk9ebbbbbbbbhhdnaxce9imbaxhddnaxceGTmbavc:Gefaxcitfgdc94fgoao8Ribgzad8Ribgs:Ggg85ibadasazag:H:G85ibaxcufhdkaxceSmbadcdfhoadcitavc:Geffc9Wfhdinadad8Ribgsadcwfgr8RibggadczfgH8Ribg8J:Ggz:Gg8K85ibaHa8Jagaz:H:G85ibarazasa8K:H:G85ibadc9Wfhdaoc9:fgocd9kmbkaxceSmbaxcefhoaxcitavc:Geffc94fhdinadad8Ribgzadcwfgr8Ribgs:Ggg85ibarasazag:H:G85ibadc94fhdaocufgocd0mbkaxcefhoavc:Gefaxcitfhd9ebbbbbbbbhhinahad8Rib:Ghhadc94fhdaocufgocd0mbkkav8Ri:Gehza8Fmdaeaz85ibaeah85izaeav8Ri:Oe85iwxikdndnaxcb9omb9ebbbbbbbbhzxekdndnaxciGci9hmb9ebbbbbbbbhzaxhoxekaxcefciGhravc:Gefaxcitfhd9ebbbbbbbbhzaxhoinaocufhoazad8Rib:Ghzadc94fhdarcufgrmbkkaxci6mbaocefhraocitavc:Geffc9OfhdinazadcKf8Rib:Gadczf8Rib:Gadcwf8Rib:Gad8Rib:Ghzadc9Gfhdarc98fgrmbkkaeaz:Aaza8FE85ibxdkdndnaxcb9omb9ebbbbbbbbhzxekdndnaxciGci9hmb9ebbbbbbbbhzaxhoxekaxcefciGhravc:Gefaxcitfhd9ebbbbbbbbhzaxhoinaocufhoazad8Rib:Ghzadc94fhdarcufgrmbkkaxci6mbaocefhraocitavc:Geffc9OfhdinazadcKf8Rib:Gadczf8Rib:Gadcwf8Rib:Gad8Rib:Ghzadc9Gfhdarc98fgrmbkkaeaz:Aaza8FE85ibav8Ri:Geaz:Hhzcehddnaxce9imbaxciGhodnaxcufci6mbaxc;8FFFrGhHavc:Gefcafhdcbhrinazadc9Of8Rib:Gadc9Wf8Rib:Gadc94f8Rib:Gad8Rib:GhzadcafhdaHarclfgr9hmbkaoTmearcefhdkavc:Gefadcitfhdinazad8Rib:Ghzadcwfhdaocufgombkkaeaz:Aaza8FE85iwxekaeaz:A85ibaeah:A85izaeav8Ri:Oe:A85iwkavc:Wlf8Kjjjjba5crGk:ediiue98eu8Jjjjjbcz9Rgd8Kjjjjbdndnab:8gicFFFFrGglc;A:F:K;Ul0mbaeab:7gvav9e:d;i;j9T8W9F;KZ:I9ebbbbbbUJ:G9ebbbbbbU;d:Ggv9ebbb9q;7h;5:;:I:Gav9e9J9I8A9H:0z9r:::I:G85ibav;8dhlxekdnalcjjj;8r6mbaeabab:t:785ibcbhlxekadalalcL4c;Q9:fgocLt9R:::785iwadcwfadaocecbz:kjjjbhlad8Ribhvdnaicu9kmbaeav:A85ibcbal9Rhlxekaeav85ibkadczf8Kjjjjbalk;piiiue99e988Jjjjjbcz9Rge8Kjjjjbdndnab:8gdcFFFFrGgic;A:F:K;6i0mbJbbjZhlaicjjj;mi6meab:7z1jjjbhlxekdnaic;r:N;T:dl0mbdnaic;K:x;Bjl6mb9eKR9e9u;7hDn9eKR9e9u;7hD;aadcb9iEab:7:Gz1jjjb:mhlxdkab:7hvdnadcu9kmbav9eKR9e9u;7h;5Z:Gz:jjjjbhlxdk9eKR9e9u;7h;5Zav:Hz:jjjjbhlxekdnaic;v;J1:hl0mbdnaic;G;B:;:fl6mb9eKR9e9u;7hYn9eKR9e9u;7hY;aadcb9iEab:7:Gz1jjjbhlxdkdnadcu9kmb9e;sh8Zu98;zO;aab:7:Hz:jjjjbhlxdkab:79e;sh8Zu98;zO;a:Gz:jjjjbhlxekdnaicjjj;8r6mbabab:thlxekabaecwfz:ljjjbhiae8RiwhvdndndndnaiciGPlbedibkavz1jjjbhlxikav:Az:jjjjbhlxdkavz1jjjb:mhlxekavz:jjjjbhlkaeczf8Kjjjjbalk:Uebdndnaecjw9imbab9ebbbbbb;Gu:IhbdnaecFs9pmbaec:b94fhexdkab9ebbbbbb;Gu:IhbaecpLaecpL6Ec:c9Wfhexekaec:b949kmbab9ebbbbbb9Gi:Ihbdnaec:49W9nmbaec;jrfhexekab9ebbbbbb9Gi:Ihbaec;W9Oaec;W9O0EcMsfhekabaecFrf:T9c80:g:;:Ikk;mQdbcj:Gdk:WQebbbdbbbbbbbebbbibbblbbblbbbobbb:d;5:Ib9e9o9Ub;88PXb;r9x8Nb;D80;1b9I;B;ab88:z:vbc:qJb9J9r;:b:7;E:Rb:39H;fb869U8Kb;s9n9cb6o;GbD;Q8Ub3M;rb;R5;:b8P:X3b;O8::Nb;181:cb9e:78Ub:C;P:eb:08M9Wbc9:9Fb;w:r85b9t:d85b:C;085b:l9F:eby;5:9b;48F87b;EF:xbs:yvbH8V;Vbq9A:lb9T8F9Tb;p9:BbD;l8NbS9p:3b:E9MZbR;Q9Fb:68N91b;L;R;hb8997;Xb;385rbM9s:kb;79R;Qb8F:X9Fbw9D:nb8Wi9wb97;8Sb;W:R9Rba:8;pbB;0:Ab;J:P5b9E9H:rbwE;Mb:f:zWb:GC9Fb:nn9Obj;yFb8N79nboo8Xb;k9wXb;j:O7b97;I9Gb9R:m;abY;e9hb;n9N;dbD;O;Cb9z:dIb:l4;eb:M3:wb9e:V;DbY9x;rb:L8:vbvrFb8Z9:Zb;c8Y;Ob:y9p;Eb:7998Yb8M89;db8E9R;Vb:F;49Eb818F86bu;Y;kb;X:h5b98:qhbf8K98b;v9U;6b8WR93bX87Jb:1C;gb;dY:Db:T;e;cb8S9ncbxb9Db:g99Sb;JGRb:B;g:Ab8Z9Ibb:0;s98b:0:N:xb839v;vb;x8:;2b:JzKb9n4;8b9K:DIb9W;x:Rb9J98;4b96:W9xbLX;Nb;a69wb87;w;zb:N:eUb8K8J;lb;w:k93b9A9u8Jbb8F:5b;XqEbY;o;Fb:F8XFb9M8Efb:z9x9Hb:S;79hb9:u;ybgW:3b8Y;O:jb;M:;9Gb;V;e;nb2BDb9DZ;ubQ;E;xb9y87;Eb;E:BMb;sgyby:g;Ob;I9y9nb;g;k8Ybw;JQb;G99;lbL;a9qb;Z5:NbK;G9Bb8UA80b:dO9Ib:d9ieb;1:o9Bb:T:Wub8E;P;Yb9i9kJbz9N;tb:Q;D;yb:U9F9cbf9H;obqy:Kb;t:z:0bo:M;Yb9C93ub:J;c:db9H881b:k794b:V:m9Ab9V;x:9bR:M9Jb;0:;;lb:n:b;Vb8M;b9Nb9v;kTb;k;zBby:O;sb;c9H:nbO;j93bl8MCbOS:Bb;e9z;eb;i;f9eb9n:Y:rbbL;Zb;uJ:Tb8P6;Lbp;vzbb::;8b8EN;mb9W;o;UbA8:;1b;S;Xjb:Z;N;db;h;4yb:tvNb;bG8:b8UD:ZbkT;Zb1O:Cb:Ra97b8U:1:Fb9hM;cb978Y8Vbx9v9TbV:N:qb9R;N8Fb8X;l:wb95Q9kbc95;Ib;0;F:jb;ON:xb;I;M:eb:z8X:xb1;T9Rb9F9FBb:7pPb9i:A:0b9N:K2bGV9cb:n9D8Yb:FX:4b:8;LDb:n8X8Lb;3t85b8Wv3bmxeb0w9Ob8S;U9yb9h:Q:qbt;Ndb:9;w8Kb;399:Mb9U9iVb:FQ;Vb:oN:Mb:0:r;2b;r9t9rb;pq;Yba:y8Zb;109:b:Y9J9Ob;D8:9Fbn9Dib:f:jub9v9s8Pb839K;ab9T;yzb8Y9i8Yb9B9m91b9oG;ubT9u9UbkD;bbI;19PbC9M;vb8Nr:Db9Dl9qb:087;Bb;Q4;fb:h;5Lb69R99b58N:6b:w9P8Pb;g;m:Sb:TC9ub:q;Ifb1;z:jb8SV9qbl:K::b93rNb;Z8W9Wbb;88Nb;QG:Ob9M;c6b9K;G89b:x;D:db:JZ:xbJNpbm:g:mb8Xc;EbM85:Db;D9W:mbL:3;Nbw;F87bX838Rb9Cj:Gb9Aj:tbzHMbs;O;yb2j:Vb;BF0bU:qsb9zK4b9I:LXb9H;l:7b;h:j:5bzn:9b;s;Ylb6918Nb;R:2;2b;Bg:7bqC:Qb:j8M8Vb9K:d4bD878ZbPN8Ab9r86:Qb5:J;cb:V;T:Ub9C8MOb9T;c9nbR96:Cb;a9w:xbiZ:dbD;W;2b8Rn:mb9T8X:zb85:0rbxaXb;y;d9Bb;1M;eb;g:T0b9o;k:Lb:N83;nb;M:PBb:RMNb;D9c9ObY9J;Eb4:m;Vb9O:l9sb;8;B83b:U:H:Rb;FX8Xbb:U:Hbx;7;Ab9K9n9Mb;Tv:3b8PW8Wb9x9w:;b9hF86bf;5:5b91::;Zby:t;Fb:Rj8Wb9M:m;2bl;lXb;6gob;z;K5b89:Z:Kb9xE:pbB;nDb9o9c;PbA:::Kb8Z8J:1b;W:Q8Ab9pW:Ob;s;b:LbkZsb9B94;nb8J;54b97:llb:jLVb;g:M9tb9V9U;Ib;V;Rbb:B9k9yb;e;A:3b:Q9M:6b4;p;pb;rd5b:X;XRb:m:z;bb;d:T93b:g9i;Ab;39D:Gb;gj;0b:S;W8Vb;D;S:AbZ9C:8b;q;E9Tb:q;h8FbI;B:2b:J8L86bb:V:Ab:T9t:tb:29xlb8PR:0b0j9:b;Ar:Nb4:QPb979z:HbQOIb;C:3Rb;6;Lpb:j;B;:b:j::pb;K42bo:P;8b8:j9Wb:f9UXbp:hFby8:rb9H9N8ZbIK:gb9n:9;Qb:Z;N:Vb:p9T9Ub:v9N85b8X:;9Bb:e;x9ib8W;FQb;hRJb8L9H81b;j9W;ob8W;l:4b:;2pb:Kb:Ibv2;Kb9A;D:Gbh9V9hb9IO;sb:59C:eb9W9H6b9R9w;Gb:z9seb9q9v83b8E;v:3b8Z;X;ebA9U9Fb9D8W;Kb:f8U:Pb5:Y;db:H8YBbw:3:Kb;Q:X;ubQ;3hb:p9P;Kb8NF93bxijb:nnRb9p;n:Gba:L:zb:Z:I;tb8V9Dqb:0;59cbH;A;lb99::;qb:B;B;bb:RL:9b;k:I:bbwf9Cb8U9vLb8Nb9vbuC;Wb;Hr:gbCk9Kb:wc:nb:h::;Eb;ApIb9R8L:2b97:j80bv;Z;:b:5:;:Eb9Of9pb9kI:Ob9p;e9AbR;4:8b;x9A:yb;0;h:vbm9n:nba86:Mb:K9x9FbCZ:XbjU:vb;maebG;D:gb;j;E:2b:;9G;1b9nWHber9Rb:m:W:Sb:Y;a;qb9r9v9ib8E;7Pb:vV;db:Jo87b;an81bo;C97b;GT;mb9o8P;6b;w;k;ib;O;Zcb989K;Eb:B9K;yb;z::8Xb:K:x;db939y;ub9P;J;fb;W;AAb:68688bSKSb9v919Fb;s:9;1b9UM;gb:S8U9DbP9e;Tb38:9cb9H;e:hb8Pp;Pb;N;w;Zbg98;kb9V:r81bw;G;fbF;x:nb9Uf;Ib:Wp;gb:tw;bb989Dtb9R:T:Yb;n9U:Db8:V97b;gHfb;3;p:Pb8P7;Fb:1;j:6b:3b9rb;I:Ymbt:68Kb;L999Gbt;y:kbmX8Sb:bKxb9:9MNbe8PQb:F964bpp::b9wT;Vb;z9:Bb;S;zAb:l:6:5b;e:x;8b8X:O8Nb;X9U;dbN;fBb;y:O9wb:0:O:1b;p;mPbO:jRb9V9x80b8S9w:jb:z;o;Jb;wa:5b9R9E:Qb8:I:CbH9F;mbpk9kb;H;0;7b:o879Tb;I:g8Sb;P;u:eb;8:0:Pb;V;U;rb8U81;jb8V859HbUh9ebE;z;ib:b;8qb;79kfb8V3;yb9t:0:eb9o:z:mb9ug;mbI9v;Cb;a;g;wbkY:wb8A9W:4b9P:v9Kb8M9A9GbZ9s;UbuHsb;0:1Hb;8;l;1b80:8Rb80:8;Ub;O9D;mb;D9E9Gb9N:o:BbM8Z;Vb;jL:4b9H9y:Bb;H9x:8b9r:d;gb;y8:zb;DG9ibR3;Db:VK:Hbh8SSb9z;Z;xb;z96:yb:E9u;ab9p:g;6b9wo;8b;L95:Ub:jgBbU:Tgb9N:t;Cb9v;O:Qb:c8MUb;k;N:Bb9rm:Kb:z8Z:Xb:P;xPb9Pv9ibW:Y;Wbu1:Nb19m:xb;5;rBbhM:Zb97:c9kb:y;phbn:F;Cb;C9h9vb;Ht86b9N;R9cb;::D;Fb9E;u9Fb979N:Kb:6:S96b9v;2:Ib8R18Jbc:69vb9z9UwbhI:gb859h:db:j;J;Mb;L:E;ub6;7nbF9w;Pb3s;kb;f9z:kbN;68Rb;t;b;fbs;f;pb;B9A:Ub9h;f:gb:fJ9Ibh:g87b8S95Nbz9H:hbI9m97bj8S8AbJ:;Ob18M:qb9488:jb:O;e;Kb;L;B97b;e86;cb8M;0;Qb;39N:kbmM:;bW:J8Rb89:t:Xb:998kb:K9r;Cb8N;D9Jb9P;H;Db:ANYb:O8P:vb9O;oybD;T:0b9e:Fab9o:y;kb9W:c9Jb9:988Jbs:58Yb:N;1:obC9w;Nbh;Xwb:1:DIb9V9:9nb:LY9rb:1;5:Rb:c;F;wb:w;D9HbQBdb;e86:Fb:d:I:HbV;T9Tb85:n96b:c:4:Pb9R8Y9CbS8N9Bbb80;Tb;sb93b;8;09vbe9z9nb;GGjbbbbbbbbbbbbn;7h;5ZbbbbR9et8:bbbj:yS;488bbb9G9r;m9487bbbj:dE;W85bbbna8L96Ubbbjg:c;JBbbbb5;Z9P81bc:W:2dkxebbbdbbbn:Bbb";
  var wasmpack = new Uint8Array([
    32,
    0,
    65,
    2,
    1,
    106,
    34,
    33,
    3,
    128,
    11,
    4,
    13,
    64,
    6,
    253,
    10,
    7,
    15,
    116,
    127,
    5,
    8,
    12,
    40,
    16,
    19,
    54,
    20,
    9,
    27,
    255,
    113,
    17,
    42,
    67,
    24,
    23,
    146,
    148,
    18,
    14,
    22,
    45,
    70,
    69,
    56,
    114,
    101,
    21,
    25,
    63,
    75,
    136,
    108,
    28,
    118,
    29,
    73,
    115
  ]);
  if (typeof WebAssembly !== "object") {
    return {
      supported: false
    };
  }
  var instance;
  var ready = WebAssembly.instantiate(unpack(wasm), {}).then(function(result) {
    instance = result.instance;
    instance.exports.__wasm_call_ctors();
  });
  function unpack(data) {
    var result = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
      var ch = data.charCodeAt(i);
      result[i] = ch > 96 ? ch - 97 : ch > 64 ? ch - 39 : ch + 4;
    }
    var write = 0;
    for (var i = 0; i < data.length; ++i) {
      result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
    }
    return result.buffer.slice(0, write);
  }
  function assert(cond) {
    if (!cond) {
      throw new Error("Assertion failed");
    }
  }
  function bytes(view) {
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  }
  function gentangents(indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, vertex_normals, vertex_normals_stride, vertex_uvs, vertex_uvs_stride, options) {
    var sbrk = instance.exports.sbrk;
    var resultp = sbrk(index_count * 16);
    var indicesp = indices ? sbrk(indices.byteLength) : 0;
    var positionsp = sbrk(vertex_positions.byteLength);
    var normalsp = sbrk(vertex_normals.byteLength);
    var uvsp = sbrk(vertex_uvs.byteLength);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    if (indices) heap.set(bytes(indices), indicesp);
    heap.set(bytes(vertex_positions), positionsp);
    heap.set(bytes(vertex_normals), normalsp);
    heap.set(bytes(vertex_uvs), uvsp);
    instance.exports.meshopt_generateTangents(
      resultp,
      indicesp,
      index_count,
      positionsp,
      vertex_count,
      vertex_positions_stride * 4,
      normalsp,
      vertex_normals_stride * 4,
      uvsp,
      vertex_uvs_stride * 4,
      options
    );
    heap = new Uint8Array(instance.exports.memory.buffer);
    var result = new Float32Array(heap.buffer, resultp, index_count * 4).slice();
    sbrk(resultp - sbrk(0));
    return result;
  }
  function gennormals(indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, crease_angle, smoothing) {
    var sbrk = instance.exports.sbrk;
    var resultp = sbrk(index_count * 12);
    var indicesp = indices ? sbrk(indices.byteLength) : 0;
    var positionsp = sbrk(vertex_positions.byteLength);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    if (indices) heap.set(bytes(indices), indicesp);
    heap.set(bytes(vertex_positions), positionsp);
    instance.exports.meshopt_generateNormals(
      resultp,
      indicesp,
      index_count,
      positionsp,
      vertex_count,
      vertex_positions_stride * 4,
      crease_angle,
      smoothing
    );
    heap = new Uint8Array(instance.exports.memory.buffer);
    var result = new Float32Array(heap.buffer, resultp, index_count * 3).slice();
    sbrk(resultp - sbrk(0));
    return result;
  }
  var tangentOptions = {
    Compatible: 1,
    ZeroFallback: 2
  };
  return {
    ready,
    supported: true,
    generateTangents: function(indices, vertex_positions, vertex_positions_stride, vertex_normals, vertex_normals_stride, vertex_uvs, vertex_uvs_stride, flags) {
      assert(
        indices === null || indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array
      );
      assert(indices === null || indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(vertex_normals instanceof Float32Array);
      assert(vertex_normals.length % vertex_normals_stride == 0);
      assert(vertex_normals_stride >= 3);
      assert(vertex_uvs instanceof Float32Array);
      assert(vertex_uvs.length % vertex_uvs_stride == 0);
      assert(vertex_uvs_stride >= 2);
      assert(vertex_positions.length / vertex_positions_stride == vertex_normals.length / vertex_normals_stride);
      assert(vertex_positions.length / vertex_positions_stride == vertex_uvs.length / vertex_uvs_stride);
      assert(indices !== null || vertex_positions.length / vertex_positions_stride % 3 == 0);
      var options = 0;
      for (var i = 0; i < (flags ? flags.length : 0); ++i) {
        assert(flags[i] in tangentOptions);
        options |= tangentOptions[flags[i]];
      }
      var vertex_count = vertex_positions.length / vertex_positions_stride;
      var index_count = indices ? indices.length : vertex_count;
      var indices32 = indices === null || indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      return gentangents(
        indices32,
        index_count,
        vertex_positions,
        vertex_count,
        vertex_positions_stride,
        vertex_normals,
        vertex_normals_stride,
        vertex_uvs,
        vertex_uvs_stride,
        options
      );
    },
    generateNormals: function(indices, vertex_positions, vertex_positions_stride, crease_angle, smoothing) {
      assert(
        indices === null || indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array
      );
      assert(indices === null || indices.length % 3 == 0);
      assert(vertex_positions instanceof Float32Array);
      assert(vertex_positions.length % vertex_positions_stride == 0);
      assert(vertex_positions_stride >= 3);
      assert(indices !== null || vertex_positions.length / vertex_positions_stride % 3 == 0);
      assert(crease_angle >= 0 && crease_angle <= Math.PI);
      smoothing = smoothing || 0;
      var vertex_count = vertex_positions.length / vertex_positions_stride;
      var index_count = indices ? indices.length : vertex_count;
      var indices32 = indices === null || indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
      return gennormals(indices32, index_count, vertex_positions, vertex_count, vertex_positions_stride, crease_angle, smoothing);
    }
  };
})();

// packages/engine/Source/Scene/Axis.js
var Axis = {
  /**
   * Denotes the x-axis.
   *
   * @type {number}
   * @constant
   */
  X: 0,
  /**
   * Denotes the y-axis.
   *
   * @type {number}
   * @constant
   */
  Y: 1,
  /**
   * Denotes the z-axis.
   *
   * @type {number}
   * @constant
   */
  Z: 2
};
Axis.Y_UP_TO_Z_UP = Matrix4_default.fromRotationTranslation(
  // Rotation about PI/2 around the X-axis
  Matrix3_default.fromArray([1, 0, 0, 0, 0, 1, 0, -1, 0])
);
Axis.Z_UP_TO_Y_UP = Matrix4_default.fromRotationTranslation(
  // Rotation about -PI/2 around the X-axis
  Matrix3_default.fromArray([1, 0, 0, 0, 0, -1, 0, 1, 0])
);
Axis.X_UP_TO_Z_UP = Matrix4_default.fromRotationTranslation(
  // Rotation about -PI/2 around the Y-axis
  Matrix3_default.fromArray([0, 0, 1, 0, 1, 0, -1, 0, 0])
);
Axis.Z_UP_TO_X_UP = Matrix4_default.fromRotationTranslation(
  // Rotation about PI/2 around the Y-axis
  Matrix3_default.fromArray([0, 0, -1, 0, 1, 0, 1, 0, 0])
);
Axis.X_UP_TO_Y_UP = Matrix4_default.fromRotationTranslation(
  // Rotation about PI/2 around the Z-axis
  Matrix3_default.fromArray([0, 1, 0, -1, 0, 0, 0, 0, 1])
);
Axis.Y_UP_TO_X_UP = Matrix4_default.fromRotationTranslation(
  // Rotation about -PI/2 around the Z-axis
  Matrix3_default.fromArray([0, -1, 0, 1, 0, 0, 0, 0, 1])
);
Axis.fromName = function(name) {
  Check_default.typeOf.string("name", name);
  return Axis[name];
};
Object.freeze(Axis);
var Axis_default = Axis;

// packages/engine/Source/Scene/SceneMode.js
var SceneMode = {
  /**
   * Morphing between mode, e.g., 3D to 2D.
   *
   * @type {number}
   * @constant
   */
  MORPHING: 0,
  /**
   * Columbus View mode.  A 2.5D perspective view where the map is laid out
   * flat and objects with non-zero height are drawn above it.
   *
   * @type {number}
   * @constant
   */
  COLUMBUS_VIEW: 1,
  /**
   * 2D mode.  The map is viewed top-down with an orthographic projection.
   *
   * @type {number}
   * @constant
   */
  SCENE2D: 2,
  /**
   * 3D mode.  A traditional 3D perspective view of the globe.
   *
   * @type {number}
   * @constant
   */
  SCENE3D: 3
};
SceneMode.getMorphTime = function(value) {
  if (value === SceneMode.SCENE3D) {
    return 1;
  } else if (value === SceneMode.MORPHING) {
    return void 0;
  }
  return 0;
};
Object.freeze(SceneMode);
var SceneMode_default = SceneMode;

// packages/engine/Source/Core/TaskProcessor.js
var import_urijs = __toESM(require_URI(), 1);

// packages/engine/Source/Core/Fullscreen.js
var _supportsFullscreen;
var _names = {
  requestFullscreen: void 0,
  exitFullscreen: void 0,
  fullscreenEnabled: void 0,
  fullscreenElement: void 0,
  fullscreenchange: void 0,
  fullscreenerror: void 0
};
var Fullscreen = {};
Object.defineProperties(Fullscreen, {
  /**
   * The element that is currently fullscreen, if any.  To simply check if the
   * browser is in fullscreen mode or not, use {@link Fullscreen#fullscreen}.
   * @memberof Fullscreen
   * @type {object}
   * @readonly
   */
  element: {
    get: function() {
      if (!Fullscreen.supportsFullscreen()) {
        return void 0;
      }
      return document[_names.fullscreenElement];
    }
  },
  /**
   * The name of the event on the document that is fired when fullscreen is
   * entered or exited.  This event name is intended for use with addEventListener.
   * In your event handler, to determine if the browser is in fullscreen mode or not,
   * use {@link Fullscreen#fullscreen}.
   * @memberof Fullscreen
   * @type {string}
   * @readonly
   */
  changeEventName: {
    get: function() {
      if (!Fullscreen.supportsFullscreen()) {
        return void 0;
      }
      return _names.fullscreenchange;
    }
  },
  /**
   * The name of the event that is fired when a fullscreen error
   * occurs.  This event name is intended for use with addEventListener.
   * @memberof Fullscreen
   * @type {string}
   * @readonly
   */
  errorEventName: {
    get: function() {
      if (!Fullscreen.supportsFullscreen()) {
        return void 0;
      }
      return _names.fullscreenerror;
    }
  },
  /**
   * Determine whether the browser will allow an element to be made fullscreen, or not.
   * For example, by default, iframes cannot go fullscreen unless the containing page
   * adds an "allowfullscreen" attribute (or prefixed equivalent).
   * @memberof Fullscreen
   * @type {boolean}
   * @readonly
   */
  enabled: {
    get: function() {
      if (!Fullscreen.supportsFullscreen()) {
        return void 0;
      }
      return document[_names.fullscreenEnabled];
    }
  },
  /**
   * Determines if the browser is currently in fullscreen mode.
   * @memberof Fullscreen
   * @type {boolean}
   * @readonly
   */
  fullscreen: {
    get: function() {
      if (!Fullscreen.supportsFullscreen()) {
        return void 0;
      }
      return Fullscreen.element !== null;
    }
  }
});
Fullscreen.supportsFullscreen = function() {
  if (defined_default(_supportsFullscreen)) {
    return _supportsFullscreen;
  }
  _supportsFullscreen = false;
  const body = document.body;
  if (typeof body.requestFullscreen === "function") {
    _names.requestFullscreen = "requestFullscreen";
    _names.exitFullscreen = "exitFullscreen";
    _names.fullscreenEnabled = "fullscreenEnabled";
    _names.fullscreenElement = "fullscreenElement";
    _names.fullscreenchange = "fullscreenchange";
    _names.fullscreenerror = "fullscreenerror";
    _supportsFullscreen = true;
    return _supportsFullscreen;
  }
  const prefixes = ["webkit", "moz", "o", "ms", "khtml"];
  let name;
  for (let i = 0, len = prefixes.length; i < len; ++i) {
    const prefix = prefixes[i];
    name = `${prefix}RequestFullscreen`;
    if (typeof body[name] === "function") {
      _names.requestFullscreen = name;
      _supportsFullscreen = true;
    } else {
      name = `${prefix}RequestFullScreen`;
      if (typeof body[name] === "function") {
        _names.requestFullscreen = name;
        _supportsFullscreen = true;
      }
    }
    name = `${prefix}ExitFullscreen`;
    if (typeof document[name] === "function") {
      _names.exitFullscreen = name;
    } else {
      name = `${prefix}CancelFullScreen`;
      if (typeof document[name] === "function") {
        _names.exitFullscreen = name;
      }
    }
    name = `${prefix}FullscreenEnabled`;
    if (document[name] !== void 0) {
      _names.fullscreenEnabled = name;
    } else {
      name = `${prefix}FullScreenEnabled`;
      if (document[name] !== void 0) {
        _names.fullscreenEnabled = name;
      }
    }
    name = `${prefix}FullscreenElement`;
    if (document[name] !== void 0) {
      _names.fullscreenElement = name;
    } else {
      name = `${prefix}FullScreenElement`;
      if (document[name] !== void 0) {
        _names.fullscreenElement = name;
      }
    }
    name = `${prefix}fullscreenchange`;
    if (document[`on${name}`] !== void 0) {
      if (prefix === "ms") {
        name = "MSFullscreenChange";
      }
      _names.fullscreenchange = name;
    }
    name = `${prefix}fullscreenerror`;
    if (document[`on${name}`] !== void 0) {
      if (prefix === "ms") {
        name = "MSFullscreenError";
      }
      _names.fullscreenerror = name;
    }
  }
  return _supportsFullscreen;
};
Fullscreen.requestFullscreen = function(element, vrDevice) {
  if (!Fullscreen.supportsFullscreen()) {
    return;
  }
  element[_names.requestFullscreen]({ vrDisplay: vrDevice });
};
Fullscreen.exitFullscreen = function() {
  if (!Fullscreen.supportsFullscreen()) {
    return;
  }
  document[_names.exitFullscreen]();
};
Fullscreen._names = _names;
var Fullscreen_default = Fullscreen;

// packages/engine/Source/Core/FeatureDetection.js
var theNavigator;
if (typeof navigator !== "undefined") {
  theNavigator = navigator;
} else {
  theNavigator = {};
}
function extractVersion(versionString) {
  const parts = versionString.split(".");
  for (let i = 0, len = parts.length; i < len; ++i) {
    parts[i] = parseInt(parts[i], 10);
  }
  return parts;
}
var isChromeResult;
var chromeVersionResult;
function isChrome() {
  if (!defined_default(isChromeResult)) {
    isChromeResult = false;
    if (!isEdge()) {
      const fields = / Chrome\/([\.0-9]+)/.exec(theNavigator.userAgent);
      if (fields !== null) {
        isChromeResult = true;
        chromeVersionResult = extractVersion(fields[1]);
      }
    }
  }
  return isChromeResult;
}
function chromeVersion() {
  return isChrome() && chromeVersionResult;
}
var isSafariResult;
var safariVersionResult;
function isSafari() {
  if (!defined_default(isSafariResult)) {
    isSafariResult = false;
    if (!isChrome() && !isEdge() && / Safari\/[\.0-9]+/.test(theNavigator.userAgent)) {
      const fields = / Version\/([\.0-9]+)/.exec(theNavigator.userAgent);
      if (fields !== null) {
        isSafariResult = true;
        safariVersionResult = extractVersion(fields[1]);
      }
    }
  }
  return isSafariResult;
}
function safariVersion() {
  return isSafari() && safariVersionResult;
}
var isWebkitResult;
var webkitVersionResult;
function isWebkit() {
  if (!defined_default(isWebkitResult)) {
    isWebkitResult = false;
    const fields = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(theNavigator.userAgent);
    if (fields !== null) {
      isWebkitResult = true;
      webkitVersionResult = extractVersion(fields[1]);
      webkitVersionResult.isNightly = !!fields[2];
    }
  }
  return isWebkitResult;
}
function webkitVersion() {
  return isWebkit() && webkitVersionResult;
}
var isEdgeResult;
var edgeVersionResult;
function isEdge() {
  if (!defined_default(isEdgeResult)) {
    isEdgeResult = false;
    const fields = / Edg\/([\.0-9]+)/.exec(theNavigator.userAgent);
    if (fields !== null) {
      isEdgeResult = true;
      edgeVersionResult = extractVersion(fields[1]);
    }
  }
  return isEdgeResult;
}
function edgeVersion() {
  return isEdge() && edgeVersionResult;
}
var isFirefoxResult;
var firefoxVersionResult;
function isFirefox() {
  if (!defined_default(isFirefoxResult)) {
    isFirefoxResult = false;
    const fields = /Firefox\/([\.0-9]+)/.exec(theNavigator.userAgent);
    if (fields !== null) {
      isFirefoxResult = true;
      firefoxVersionResult = extractVersion(fields[1]);
    }
  }
  return isFirefoxResult;
}
var isWindowsResult;
function isWindows() {
  if (!defined_default(isWindowsResult)) {
    isWindowsResult = /Windows/i.test(theNavigator.appVersion);
  }
  return isWindowsResult;
}
var isIPadOrIOSResult;
function isIPadOrIOS() {
  if (!defined_default(isIPadOrIOSResult)) {
    isIPadOrIOSResult = navigator.platform === "iPhone" || navigator.platform === "iPod" || navigator.platform === "iPad";
  }
  return isIPadOrIOSResult;
}
function firefoxVersion() {
  return isFirefox() && firefoxVersionResult;
}
var hasPointerEvents;
function supportsPointerEvents() {
  if (!defined_default(hasPointerEvents)) {
    hasPointerEvents = !isFirefox() && typeof PointerEvent !== "undefined" && (!defined_default(theNavigator.pointerEnabled) || theNavigator.pointerEnabled);
  }
  return hasPointerEvents;
}
var imageRenderingValueResult;
var supportsImageRenderingPixelatedResult;
function supportsImageRenderingPixelated() {
  if (!defined_default(supportsImageRenderingPixelatedResult)) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute(
      "style",
      "image-rendering: -moz-crisp-edges;image-rendering: pixelated;"
    );
    const tmp = canvas.style.imageRendering;
    supportsImageRenderingPixelatedResult = defined_default(tmp) && tmp !== "";
    if (supportsImageRenderingPixelatedResult) {
      imageRenderingValueResult = tmp;
    }
  }
  return supportsImageRenderingPixelatedResult;
}
function imageRenderingValue() {
  return supportsImageRenderingPixelated() ? imageRenderingValueResult : void 0;
}
function supportsWebP() {
  if (!supportsWebP.initialized) {
    throw new DeveloperError_default(
      "You must call FeatureDetection.supportsWebP.initialize and wait for the promise to resolve before calling FeatureDetection.supportsWebP"
    );
  }
  return supportsWebP._result;
}
supportsWebP._promise = void 0;
supportsWebP._result = void 0;
supportsWebP.initialize = function() {
  if (defined_default(supportsWebP._promise)) {
    return supportsWebP._promise;
  }
  supportsWebP._promise = new Promise((resolve) => {
    const image = new Image();
    image.onload = function() {
      supportsWebP._result = image.width > 0 && image.height > 0;
      resolve(supportsWebP._result);
    };
    image.onerror = function() {
      supportsWebP._result = false;
      resolve(supportsWebP._result);
    };
    image.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
  });
  return supportsWebP._promise;
};
Object.defineProperties(supportsWebP, {
  initialized: {
    get: function() {
      return defined_default(supportsWebP._result);
    }
  }
});
var typedArrayTypes = [];
if (typeof ArrayBuffer !== "undefined") {
  typedArrayTypes.push(
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
  );
  if (typeof Uint8ClampedArray !== "undefined") {
    typedArrayTypes.push(Uint8ClampedArray);
  }
  if (typeof Uint8ClampedArray !== "undefined") {
    typedArrayTypes.push(Uint8ClampedArray);
  }
  if (typeof BigInt64Array !== "undefined") {
    typedArrayTypes.push(BigInt64Array);
  }
  if (typeof BigUint64Array !== "undefined") {
    typedArrayTypes.push(BigUint64Array);
  }
}
var FeatureDetection = {
  isChrome,
  chromeVersion,
  isSafari,
  safariVersion,
  isWebkit,
  webkitVersion,
  isEdge,
  edgeVersion,
  isFirefox,
  firefoxVersion,
  isWindows,
  isIPadOrIOS,
  hardwareConcurrency: theNavigator.hardwareConcurrency ?? 3,
  supportsPointerEvents,
  supportsImageRenderingPixelated,
  supportsWebP,
  imageRenderingValue,
  typedArrayTypes
};
FeatureDetection.supportsBasis = function(scene) {
  return FeatureDetection.supportsWebAssembly() && scene.context.supportsBasis;
};
FeatureDetection.supportsFullscreen = function() {
  return Fullscreen_default.supportsFullscreen();
};
FeatureDetection.supportsTypedArrays = function() {
  return typeof ArrayBuffer !== "undefined";
};
FeatureDetection.supportsBigInt64Array = function() {
  return typeof BigInt64Array !== "undefined";
};
FeatureDetection.supportsBigUint64Array = function() {
  return typeof BigUint64Array !== "undefined";
};
FeatureDetection.supportsBigInt = function() {
  return typeof BigInt !== "undefined";
};
FeatureDetection.supportsWebWorkers = function() {
  return typeof Worker !== "undefined";
};
FeatureDetection.supportsWebAssembly = function() {
  return typeof WebAssembly !== "undefined";
};
FeatureDetection.supportsWebgl2 = function(scene) {
  Check_default.defined("scene", scene);
  return scene.context.webgl2;
};
FeatureDetection.supportsEsmWebWorkers = function() {
  return !isFirefox() || parseInt(firefoxVersionResult) >= 114;
};
var FeatureDetection_default = FeatureDetection;

// packages/engine/Source/Core/TaskProcessor.js
function canTransferArrayBuffer() {
  if (!defined_default(TaskProcessor._canTransferArrayBuffer)) {
    const worker = createWorker("transferTypedArrayTest");
    worker.postMessage = worker.webkitPostMessage ?? worker.postMessage;
    const value = 99;
    const array = new Int8Array([value]);
    try {
      worker.postMessage(
        {
          array
        },
        [array.buffer]
      );
    } catch (e) {
      TaskProcessor._canTransferArrayBuffer = false;
      return TaskProcessor._canTransferArrayBuffer;
    }
    TaskProcessor._canTransferArrayBuffer = new Promise((resolve) => {
      worker.onmessage = function(event) {
        const array2 = event.data.array;
        const result = defined_default(array2) && array2[0] === value;
        resolve(result);
        worker.terminate();
        TaskProcessor._canTransferArrayBuffer = result;
      };
    });
  }
  return TaskProcessor._canTransferArrayBuffer;
}
var taskCompletedEvent = new Event_default();
function urlFromScript(script) {
  let blob;
  try {
    blob = new Blob([script], {
      type: "application/javascript"
    });
  } catch (e) {
    const BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
    const blobBuilder = new BlobBuilder();
    blobBuilder.append(script);
    blob = blobBuilder.getBlob("application/javascript");
  }
  const URL2 = window.URL || window.webkitURL;
  return URL2.createObjectURL(blob);
}
function createWorker(url) {
  const uri = new import_urijs.default(url);
  const isUri = uri.scheme().length !== 0 && uri.fragment().length === 0;
  const moduleID = url.replace(/\.js$/, "");
  const options = {};
  let workerPath;
  let crossOriginUrl;
  if (isCrossOriginUrl_default(url)) {
    crossOriginUrl = url;
  } else if (!isUri) {
    const moduleAbsoluteUrl = buildModuleUrl_default(
      `${TaskProcessor._workerModulePrefix}/${moduleID}.js`
    );
    if (isCrossOriginUrl_default(moduleAbsoluteUrl)) {
      crossOriginUrl = moduleAbsoluteUrl;
    }
  }
  if (crossOriginUrl) {
    const script = `import "${crossOriginUrl}";`;
    workerPath = urlFromScript(script);
    options.type = "module";
    return new Worker(workerPath, options);
  }
  if (!isUri && typeof CESIUM_WORKERS !== "undefined") {
    const script = `
      importScripts("${urlFromScript(CESIUM_WORKERS)}");
      CesiumWorkers["${moduleID}"]();
    `;
    workerPath = urlFromScript(script);
    return new Worker(workerPath, options);
  }
  workerPath = url;
  if (!isUri) {
    workerPath = buildModuleUrl_default(
      `${TaskProcessor._workerModulePrefix + moduleID}.js`
    );
  }
  if (!FeatureDetection_default.supportsEsmWebWorkers()) {
    throw new RuntimeError_default(
      "This browser is not supported. Please update your browser to continue."
    );
  }
  options.type = "module";
  return new Worker(workerPath, options);
}
async function getWebAssemblyLoaderConfig(processor, wasmOptions) {
  const config = {
    modulePath: void 0,
    wasmBinaryFile: void 0,
    wasmBinary: void 0
  };
  if (!FeatureDetection_default.supportsWebAssembly()) {
    if (!defined_default(wasmOptions.fallbackModulePath)) {
      throw new RuntimeError_default(
        `This browser does not support Web Assembly, and no backup module was provided for ${processor._workerPath}`
      );
    }
    config.modulePath = buildModuleUrl_default(wasmOptions.fallbackModulePath);
    return config;
  }
  config.wasmBinaryFile = buildModuleUrl_default(wasmOptions.wasmBinaryFile);
  const arrayBuffer = await Resource_default.fetchArrayBuffer({
    url: config.wasmBinaryFile
  });
  config.wasmBinary = arrayBuffer;
  return config;
}
function TaskProcessor(workerPath, maximumActiveTasks) {
  this._workerPath = workerPath;
  this._maximumActiveTasks = maximumActiveTasks ?? Number.POSITIVE_INFINITY;
  this._activeTasks = 0;
  this._nextID = 0;
  this._webAssemblyPromise = void 0;
}
var createOnmessageHandler = (worker, id, resolve, reject) => {
  const listener = ({ data }) => {
    if (data.id !== id) {
      return;
    }
    if (defined_default(data.error)) {
      let error = data.error;
      if (error.name === "RuntimeError") {
        error = new RuntimeError_default(data.error.message);
        error.stack = data.error.stack;
      } else if (error.name === "DeveloperError") {
        error = new DeveloperError_default(data.error.message);
        error.stack = data.error.stack;
      } else if (error.name === "Error") {
        error = new Error(data.error.message);
        error.stack = data.error.stack;
      }
      taskCompletedEvent.raiseEvent(error);
      reject(error);
    } else {
      taskCompletedEvent.raiseEvent();
      resolve(data.result);
    }
    worker.removeEventListener("message", listener);
  };
  return listener;
};
var emptyTransferableObjectArray = [];
async function runTask(processor, parameters, transferableObjects) {
  const canTransfer = await Promise.resolve(canTransferArrayBuffer());
  if (!defined_default(transferableObjects)) {
    transferableObjects = emptyTransferableObjectArray;
  } else if (!canTransfer) {
    transferableObjects.length = 0;
  }
  const id = processor._nextID++;
  const promise = new Promise((resolve, reject) => {
    processor._worker.addEventListener(
      "message",
      createOnmessageHandler(processor._worker, id, resolve, reject)
    );
  });
  processor._worker.postMessage(
    {
      id,
      baseUrl: buildModuleUrl_default.getCesiumBaseUrl().url,
      parameters,
      canTransferArrayBuffer: canTransfer
    },
    transferableObjects
  );
  return promise;
}
async function scheduleTask(processor, parameters, transferableObjects) {
  ++processor._activeTasks;
  try {
    const result = await runTask(processor, parameters, transferableObjects);
    --processor._activeTasks;
    return result;
  } catch (error) {
    --processor._activeTasks;
    throw error;
  }
}
TaskProcessor.prototype.scheduleTask = function(parameters, transferableObjects) {
  if (!defined_default(this._worker)) {
    this._worker = createWorker(this._workerPath);
  }
  if (this._activeTasks >= this._maximumActiveTasks) {
    return void 0;
  }
  return scheduleTask(this, parameters, transferableObjects);
};
TaskProcessor.prototype.initWebAssemblyModule = async function(webAssemblyOptions) {
  if (defined_default(this._webAssemblyPromise)) {
    return this._webAssemblyPromise;
  }
  const init = async () => {
    const worker = this._worker = createWorker(this._workerPath);
    const wasmConfig = await getWebAssemblyLoaderConfig(
      this,
      webAssemblyOptions
    );
    const canTransfer = await Promise.resolve(canTransferArrayBuffer());
    let transferableObjects;
    const binary = wasmConfig.wasmBinary;
    if (defined_default(binary) && canTransfer) {
      transferableObjects = [binary];
    }
    const promise = new Promise((resolve, reject) => {
      worker.onmessage = function({ data }) {
        if (defined_default(data)) {
          resolve(data.result);
        } else {
          reject(new RuntimeError_default("Could not configure wasm module"));
        }
      };
    });
    worker.postMessage(
      {
        canTransferArrayBuffer: canTransfer,
        parameters: { webAssemblyConfig: wasmConfig }
      },
      transferableObjects
    );
    return promise;
  };
  this._webAssemblyPromise = init();
  return this._webAssemblyPromise;
};
TaskProcessor.prototype.isDestroyed = function() {
  return false;
};
TaskProcessor.prototype.destroy = function() {
  if (defined_default(this._worker)) {
    this._worker.terminate();
  }
  return destroyObject_default(this);
};
TaskProcessor.taskCompletedEvent = taskCompletedEvent;
TaskProcessor._defaultWorkerModulePrefix = "Workers/";
TaskProcessor._workerModulePrefix = TaskProcessor._defaultWorkerModulePrefix;
TaskProcessor._canTransferArrayBuffer = void 0;
var TaskProcessor_default = TaskProcessor;

// packages/engine/Source/Core/TerrainPicker.js
var MAXIMUM_TERRAIN_PICKER_LEVEL = 3;
var TerrainPicker = class {
  /**
   * @param {Float64Array} vertices The terrain mesh's vertex buffer.
   * @param {Uint8Array|Uint16Array|Uint32Array} indices The terrain mesh's index buffer.
   * @param {TerrainEncoding} encoding The terrain mesh's vertex encoding.
   */
  constructor(vertices, indices, encoding) {
    Check_default.defined("vertices", vertices);
    Check_default.defined("indices", indices);
    Check_default.defined("encoding", encoding);
    this._vertices = vertices;
    this._indices = indices;
    this._encoding = encoding;
    this._inverseTransform = new Matrix4_default();
    this._needsRebuild = true;
    this._rootNode = new TerrainPickerNode();
  }
  /**
   * Indicates whether the terrain picker needs to be rebuilt due to changes in the underlying terrain mesh's vertices or indices.
   * @type {boolean}
   */
  get needsRebuild() {
    return this._needsRebuild;
  }
  set needsRebuild(value) {
    this._needsRebuild = value;
  }
  /**
   * Determines the point on the mesh where the given ray intersects.
   * @param {Ray} ray The ray to test.
   * @param {Matrix4} tileTransform The terrain mesh tile's transform from local space to world space.
   * @param {Boolean} cullBackFaces Whether to consider back-facing triangles as intersections.
   * @param {SceneMode} mode The scene mode (2D/3D/Columbus View).
   * @param {MapProjection} projection The map projection.
   * @returns {Cartesian3 | undefined} result The intersection point, or undefined if there is no intersection.
   * @private
   */
  rayIntersect(ray, tileTransform, cullBackFaces, mode, projection) {
    if (this._needsRebuild) {
      reset(this, tileTransform);
    }
    const invTransform = this._inverseTransform;
    const transformedRay = scratchTransformedRay;
    transformedRay.origin = Matrix4_default.multiplyByPoint(
      invTransform,
      ray.origin,
      transformedRay.origin
    );
    transformedRay.direction = Matrix4_default.multiplyByPointAsVector(
      invTransform,
      ray.direction,
      transformedRay.direction
    );
    const intersections = [];
    getNodesIntersectingRay(this._rootNode, transformedRay, intersections);
    return findClosestPointInClosestNode(
      this,
      intersections,
      ray,
      cullBackFaces,
      mode,
      projection
    );
  }
};
var incrementallyBuildTerrainPickerTaskProcessor = new TaskProcessor_default(
  "incrementallyBuildTerrainPicker"
);
var TerrainPickerNode = class _TerrainPickerNode {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.level = 0;
    this.aabb = createAABBForNode(this.x, this.y, this.level);
    this.intersectingTriangles = new Uint32Array(0);
    this.children = [];
    this.buildingChildren = false;
  }
  /**
   * Adds a child node to this node.
   *
   * @param {number} childIdx The index of the child to add (0-3).
   */
  addChild(childIdx) {
    if (childIdx < 0 || childIdx > 3) {
      throw new DeveloperError_default(
        "TerrainPickerNode child index must be between 0 and 3, inclusive."
      );
    }
    const childNode = new _TerrainPickerNode();
    childNode.x = this.x * 2 + (childIdx & 1);
    childNode.y = this.y * 2 + (childIdx >> 1 & 1);
    childNode.level = this.level + 1;
    childNode.aabb = createAABBForNode(
      childNode.x,
      childNode.y,
      childNode.level
    );
    this.children[childIdx] = childNode;
  }
};
var scratchTransformedRay = new Ray_default();
var scratchTrianglePoints = [
  new Cartesian3_default(),
  new Cartesian3_default(),
  new Cartesian3_default()
];
function reset(terrainPicker, tileTransform) {
  Matrix4_default.inverse(tileTransform, terrainPicker._inverseTransform);
  terrainPicker._needsRebuild = false;
  const triangleCount = terrainPicker._indices.length / 3;
  const intersectingTriangles = new Uint32Array(triangleCount);
  for (let i = 0; i < triangleCount; ++i) {
    intersectingTriangles[i] = i;
  }
  terrainPicker._rootNode.intersectingTriangles = intersectingTriangles;
  terrainPicker._rootNode.children.length = 0;
}
var scratchAABBMin = new Cartesian3_default();
var scratchAABBMax = new Cartesian3_default();
function createAABBForNode(x, y, level) {
  const sizeAtLevel = 1 / Math.pow(2, level);
  const aabbMin = Cartesian3_default.fromElements(
    x * sizeAtLevel - 0.5,
    y * sizeAtLevel - 0.5,
    -0.5,
    scratchAABBMin
  );
  const aabbMax = Cartesian3_default.fromElements(
    (x + 1) * sizeAtLevel - 0.5,
    (y + 1) * sizeAtLevel - 0.5,
    0.5,
    scratchAABBMax
  );
  return AxisAlignedBoundingBox_default.fromCorners(aabbMin, aabbMax);
}
function packTriangleBuffers(trianglePositionsBuffer, triangleIndicesBuffer, trianglePositions, triangleIndex, bufferIndex) {
  Cartesian3_default.pack(
    trianglePositions[0],
    // @ts-expect-error https://github.com/CesiumGS/cesium/pull/13302
    trianglePositionsBuffer,
    9 * bufferIndex
  );
  Cartesian3_default.pack(
    trianglePositions[1],
    // @ts-expect-error https://github.com/CesiumGS/cesium/pull/13302
    trianglePositionsBuffer,
    9 * bufferIndex + 3
  );
  Cartesian3_default.pack(
    trianglePositions[2],
    // @ts-expect-error https://github.com/CesiumGS/cesium/pull/13302
    trianglePositionsBuffer,
    9 * bufferIndex + 6
  );
  triangleIndicesBuffer[bufferIndex] = triangleIndex;
}
var scratchInterval = new Interval_default();
function getNodesIntersectingRay(currentNode, ray, intersectingNodes) {
  const interval = IntersectionTests_default.rayAxisAlignedBoundingBox(
    ray,
    currentNode.aabb,
    scratchInterval
  );
  if (!defined_default(interval)) {
    return;
  }
  const isLeaf = !currentNode.children.length || currentNode.buildingChildren;
  if (isLeaf) {
    intersectingNodes.push({
      node: currentNode,
      interval: new Interval_default(interval.start, interval.stop)
    });
    return;
  }
  for (let i = 0; i < currentNode.children.length; i++) {
    getNodesIntersectingRay(currentNode.children[i], ray, intersectingNodes);
  }
}
function findClosestPointInClosestNode(terrainPicker, intersections, ray, cullBackFaces, mode, projection) {
  const sortedIntersections = intersections.sort(function(a, b) {
    return a.interval.start - b.interval.start;
  });
  let minT = Number.MAX_VALUE;
  for (let i = 0; i < sortedIntersections.length; i++) {
    const intersection = sortedIntersections[i];
    const intersectionResult = getClosestTriangleInNode(
      terrainPicker,
      ray,
      intersection.node,
      cullBackFaces,
      mode,
      projection
    );
    minT = Math.min(intersectionResult, minT);
    if (minT !== Number.MAX_VALUE) {
      break;
    }
  }
  if (minT !== Number.MAX_VALUE) {
    return Ray_default.getPoint(ray, minT);
  }
  return void 0;
}
function getClosestTriangleInNode(terrainPicker, ray, node, cullBackFaces, mode, projection) {
  let result = Number.MAX_VALUE;
  const encoding = terrainPicker._encoding;
  const indices = terrainPicker._indices;
  const vertices = terrainPicker._vertices;
  const triangleCount = node.intersectingTriangles.length;
  const isMaxLevel = node.level >= MAXIMUM_TERRAIN_PICKER_LEVEL;
  const shouldBuildChildren = !isMaxLevel && !node.buildingChildren;
  let trianglePositions;
  let triangleIndices;
  if (shouldBuildChildren) {
    trianglePositions = new Float64Array(triangleCount * 9);
    triangleIndices = new Uint32Array(triangleCount);
  }
  for (let i = 0; i < triangleCount; i++) {
    const triIndex = node.intersectingTriangles[i];
    const v0 = getVertexPosition(
      encoding,
      mode,
      projection,
      ray,
      vertices,
      indices[3 * triIndex],
      scratchTrianglePoints[0]
    );
    const v1 = getVertexPosition(
      encoding,
      mode,
      projection,
      ray,
      vertices,
      indices[3 * triIndex + 1],
      scratchTrianglePoints[1]
    );
    const v2 = getVertexPosition(
      encoding,
      mode,
      projection,
      ray,
      vertices,
      indices[3 * triIndex + 2],
      scratchTrianglePoints[2]
    );
    const triT = IntersectionTests_default.rayTriangleParametric(
      ray,
      v0,
      v1,
      v2,
      cullBackFaces
    );
    if (defined_default(triT) && triT < result && triT >= 0) {
      result = triT;
    }
    if (shouldBuildChildren) {
      packTriangleBuffers(
        trianglePositions,
        triangleIndices,
        scratchTrianglePoints,
        triIndex,
        i
      );
    }
  }
  if (shouldBuildChildren) {
    for (let childIdx = 0; childIdx < 4; childIdx++) {
      node.addChild(childIdx);
    }
    addTrianglesToChildrenNodes(
      terrainPicker._inverseTransform,
      node,
      triangleIndices,
      trianglePositions
    );
  }
  return result;
}
var scratchCartographic = new Cartographic_default();
function getVertexPosition(encoding, mode, projection, ray, vertices, index, result) {
  let position = encoding.getExaggeratedPosition(vertices, index, result);
  if (mode === SceneMode_default.SCENE3D) {
    return position;
  }
  const ellipsoid = projection.ellipsoid;
  const positionCartographic = ellipsoid.cartesianToCartographic(
    position,
    scratchCartographic
  );
  position = projection.project(positionCartographic, result);
  position = Cartesian3_default.fromElements(
    position.z,
    position.x,
    position.y,
    result
  );
  const worldWidth = Math_default.TWO_PI * projection.ellipsoid.maximumRadius;
  const k = Math.round((ray.origin.y - position.y) / worldWidth);
  position.y += k * worldWidth;
  return position;
}
async function addTrianglesToChildrenNodes(inverseTransform, node, triangleIndices, trianglePositions) {
  node.buildingChildren = true;
  const inverseTransformPacked = new Float64Array(16);
  Matrix4_default.pack(inverseTransform, inverseTransformPacked, 0);
  const aabbArray = new Float64Array(6 * 4);
  for (let i = 0; i < 4; i++) {
    Cartesian3_default.pack(node.children[i].aabb.minimum, aabbArray, i * 6);
    Cartesian3_default.pack(node.children[i].aabb.maximum, aabbArray, i * 6 + 3);
  }
  const parameters = {
    aabbs: aabbArray,
    inverseTransform: inverseTransformPacked,
    triangleIndices,
    trianglePositions
  };
  const transferableObjects = [
    aabbArray.buffer,
    inverseTransformPacked.buffer,
    triangleIndices.buffer,
    trianglePositions.buffer
  ];
  const incrementallyBuildTerrainPickerPromise = incrementallyBuildTerrainPickerTaskProcessor.scheduleTask(
    parameters,
    transferableObjects
  );
  if (!defined_default(incrementallyBuildTerrainPickerPromise)) {
    node.buildingChildren = false;
    return;
  }
  const result = (
    /** @type {{intersectingTrianglesArrays: ArrayBuffer[]}} */
    await incrementallyBuildTerrainPickerPromise
  );
  result.intersectingTrianglesArrays.forEach((buffer, index) => {
    if (defined_default(node.children[index])) {
      node.children[index].intersectingTriangles = new Uint32Array(buffer);
    }
  });
  node.intersectingTriangles = new Uint32Array(0);
  node.buildingChildren = false;
}
var TerrainPicker_default = TerrainPicker;

// packages/engine/Source/Core/TerrainMesh.js
function TerrainMesh(center, vertices, indices, indexCountWithoutSkirts, vertexCountWithoutSkirts, minimumHeight, maximumHeight, rectangle, boundingSphere3D, occludeePointInScaledSpace, vertexStride, orientedBoundingBox, encoding, westIndicesSouthToNorth, southIndicesEastToWest, eastIndicesNorthToSouth, northIndicesWestToEast) {
  this.center = center;
  this.vertices = vertices;
  this.stride = vertexStride ?? 6;
  this.indices = indices;
  this.indexCountWithoutSkirts = indexCountWithoutSkirts;
  this.vertexCountWithoutSkirts = vertexCountWithoutSkirts;
  this.minimumHeight = minimumHeight;
  this.maximumHeight = maximumHeight;
  this.rectangle = rectangle;
  this.boundingSphere3D = boundingSphere3D;
  this.occludeePointInScaledSpace = occludeePointInScaledSpace;
  this.orientedBoundingBox = orientedBoundingBox;
  this.encoding = encoding;
  this.westIndicesSouthToNorth = westIndicesSouthToNorth;
  this.southIndicesEastToWest = southIndicesEastToWest;
  this.eastIndicesNorthToSouth = eastIndicesNorthToSouth;
  this.northIndicesWestToEast = northIndicesWestToEast;
  this._transform = new Matrix4_default();
  this._lastPickSceneMode = void 0;
  this._terrainPicker = new TerrainPicker_default(vertices, indices, encoding);
}
TerrainMesh.prototype.getTransform = function(mode, projection) {
  if (this._lastPickSceneMode === mode) {
    return this._transform;
  }
  this._terrainPicker.needsRebuild = true;
  if (!defined_default(mode) || mode === SceneMode_default.SCENE3D) {
    return computeTransform(this, this._transform);
  }
  return computeTransform2D(this, projection, this._transform);
};
function computeTransform(mesh, result) {
  const exaggeration = mesh.encoding.exaggeration;
  const exaggerationRelativeHeight = mesh.encoding.exaggerationRelativeHeight;
  const exaggeratedMinHeight = VerticalExaggeration_default.getHeight(
    mesh.minimumHeight,
    exaggeration,
    exaggerationRelativeHeight
  );
  const exaggeratedMaxHeight = VerticalExaggeration_default.getHeight(
    mesh.maximumHeight,
    exaggeration,
    exaggerationRelativeHeight
  );
  const obb = OrientedBoundingBox_default.fromRectangle(
    mesh.rectangle,
    exaggeratedMinHeight,
    exaggeratedMaxHeight,
    Ellipsoid_default.default,
    mesh.orientedBoundingBox
  );
  OrientedBoundingBox_default.computeTransformation(obb, result);
  const zScale = Matrix4_default.getScale(result, scratchScale).z;
  if (zScale <= Math_default.EPSILON16) {
    scratchScale.z = 1;
    Matrix4_default.setScale(result, scratchScale, result);
  }
  return result;
}
var scratchSWCartesian = new Cartesian3_default();
var scratchNECartesian = new Cartesian3_default();
var scratchSWCartographic = new Cartographic_default();
var scratchNECartographic = new Cartographic_default();
var scratchScale2D = new Cartesian3_default();
var scratchCenter2D = new Cartesian3_default();
var scratchScale = new Cartesian3_default();
function computeTransform2D(mesh, projection, result) {
  const exaggeration = mesh.encoding.exaggeration;
  const exaggerationRelativeHeight = mesh.encoding.exaggerationRelativeHeight;
  const exaggeratedMinHeight = VerticalExaggeration_default.getHeight(
    mesh.minimumHeight,
    exaggeration,
    exaggerationRelativeHeight
  );
  const exaggeratedMaxHeight = VerticalExaggeration_default.getHeight(
    mesh.maximumHeight,
    exaggeration,
    exaggerationRelativeHeight
  );
  const southwest = projection.project(
    Cartographic_default.fromRadians(
      mesh.rectangle.west,
      mesh.rectangle.south,
      0,
      scratchSWCartographic
    ),
    scratchSWCartesian
  );
  const northeast = projection.project(
    Cartographic_default.fromRadians(
      mesh.rectangle.east,
      mesh.rectangle.north,
      0,
      scratchNECartographic
    ),
    scratchNECartesian
  );
  const heightRange = exaggeratedMaxHeight - exaggeratedMinHeight;
  const scale = Cartesian3_default.fromElements(
    northeast.x - southwest.x,
    northeast.y - southwest.y,
    heightRange > 0 ? heightRange : 1,
    // Avoid zero scale
    scratchScale2D
  );
  const center = Cartesian3_default.fromElements(
    southwest.x + scale.x * 0.5,
    southwest.y + scale.y * 0.5,
    exaggeratedMinHeight + scale.z * 0.5,
    scratchCenter2D
  );
  Matrix4_default.fromTranslation(center, result);
  Matrix4_default.setScale(result, scale, result);
  Matrix4_default.multiply(
    FixedFrameTransforms_default.SWIZZLE_3D_TO_2D_MATRIX,
    result,
    result
  );
  return result;
}
TerrainMesh.prototype.pick = function(ray, cullBackFaces, mode, projection) {
  const intersection = this._terrainPicker.rayIntersect(
    ray,
    this.getTransform(mode, projection),
    cullBackFaces,
    mode,
    projection
  );
  this._lastPickSceneMode = mode;
  return intersection;
};
TerrainMesh.prototype.updateExaggeration = function(exaggeration, exaggerationRelativeHeight) {
  this._terrainPicker._vertices = this.vertices;
  this._terrainPicker.needsRebuild = true;
  this._lastPickSceneMode = void 0;
};
TerrainMesh.prototype.updateSceneMode = function(mode) {
  this._terrainPicker.needsRebuild = true;
  this._lastPickSceneMode = void 0;
};
var TerrainMesh_default = TerrainMesh;

// packages/engine/Source/Core/Cesium3DTilesTerrainGeometryProcessor.js
var Cesium3DTilesTerrainGeometryProcessor = {};
var scratchGltfInfo = {
  positions: void 0,
  normals: void 0,
  indices: void 0,
  edgeIndicesWest: void 0,
  edgeIndicesSouth: void 0,
  edgeIndicesEast: void 0,
  edgeIndicesNorth: void 0
};
var scratchCenterCartographic = new Cartographic_default();
var scratchCenterCartesian = new Cartesian3_default();
var scratchEnuToEcef = new Matrix4_default();
var scratchEcefToEnu = new Matrix4_default();
var scratchTilesetTransform = new Matrix4_default();
var scratchMinimumPositionENU = new Cartesian3_default();
var scratchMaximumPositionENU = new Cartesian3_default();
var scratchPosLocal = new Cartesian3_default();
var scratchPosEcef = new Cartesian3_default();
var scratchCartographic2 = new Cartographic_default();
var scratchUV = new Cartesian2_default();
var scratchNormal = new Cartesian3_default();
var scratchNormalOct = new Cartesian2_default();
var scratchGeodeticSurfaceNormal = new Cartesian3_default();
var scratchPosEnu = new Cartesian3_default();
var sortedEdgeCompare = function(a, b) {
  return a - b;
};
Cesium3DTilesTerrainGeometryProcessor.createMesh = async function(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  const {
    exaggeration = 1,
    exaggerationRelativeHeight = 0,
    hasVertexNormals,
    hasWebMercatorT,
    gltf,
    minimumHeight,
    maximumHeight,
    skirtHeight
  } = options;
  Check_default.typeOf.object("options.ellipsoid", options.ellipsoid);
  Check_default.typeOf.object("options.rectangle", options.rectangle);
  Check_default.typeOf.bool("options.hasVertexNormals", hasVertexNormals);
  Check_default.typeOf.bool("options.hasWebMercatorT", hasWebMercatorT);
  Check_default.typeOf.object("options.gltf", gltf);
  Check_default.typeOf.number("options.minimumHeight", minimumHeight);
  Check_default.typeOf.number("options.maximumHeight", maximumHeight);
  Check_default.typeOf.object("options.boundingSphere", options.boundingSphere);
  Check_default.typeOf.object(
    "options.orientedBoundingBox",
    options.orientedBoundingBox
  );
  Check_default.typeOf.object(
    "options.horizonOcclusionPoint",
    options.horizonOcclusionPoint
  );
  Check_default.typeOf.number("options.skirtHeight", skirtHeight);
  const hasExaggeration = exaggeration !== 1;
  const hasGeodeticSurfaceNormals = hasExaggeration;
  const boundingSphere = BoundingSphere_default.clone(
    options.boundingSphere,
    new BoundingSphere_default()
  );
  const orientedBoundingBox = OrientedBoundingBox_default.clone(
    options.orientedBoundingBox,
    new OrientedBoundingBox_default()
  );
  const horizonOcclusionPoint = Cartesian3_default.clone(
    options.horizonOcclusionPoint,
    new Cartesian3_default()
  );
  const ellipsoid = Ellipsoid_default.clone(options.ellipsoid, new Ellipsoid_default());
  const rectangle = Rectangle_default.clone(options.rectangle, new Rectangle_default());
  const hasMeshOptCompression = gltf.extensionsRequired !== void 0 && gltf.extensionsRequired.indexOf("EXT_meshopt_compression") !== -1;
  const decoderPromise = hasMeshOptCompression ? MeshoptDecoder.ready : Promise.resolve(void 0);
  await decoderPromise;
  const tileMinLongitude = rectangle.west;
  const tileMinLatitude = rectangle.south;
  const tileMaxLatitude = rectangle.north;
  const tileLengthLongitude = rectangle.width;
  const tileLengthLatitude = rectangle.height;
  const approximateCenterCartographic = Rectangle_default.center(
    rectangle,
    scratchCenterCartographic
  );
  approximateCenterCartographic.height = 0.5 * (minimumHeight + maximumHeight);
  const approximateCenterPosition = Cartographic_default.toCartesian(
    approximateCenterCartographic,
    ellipsoid,
    scratchCenterCartesian
  );
  const enuToEcef = FixedFrameTransforms_default.eastNorthUpToFixedFrame(
    approximateCenterPosition,
    ellipsoid,
    scratchEnuToEcef
  );
  const ecefToEnu = Matrix4_default.inverseTransformation(enuToEcef, scratchEcefToEnu);
  let tilesetTransform = Matrix4_default.unpack(
    gltf.nodes[0].matrix,
    0,
    scratchTilesetTransform
  );
  tilesetTransform = Matrix4_default.multiply(
    Axis_default.Y_UP_TO_Z_UP,
    tilesetTransform,
    tilesetTransform
  );
  const gltfInfo = decodeGltf(gltf, hasVertexNormals, scratchGltfInfo);
  const skirtVertexCount = TerrainProvider_default.getSkirtVertexCount(
    gltfInfo.edgeIndicesWest,
    gltfInfo.edgeIndicesSouth,
    gltfInfo.edgeIndicesEast,
    gltfInfo.edgeIndicesNorth
  );
  const positionsLocalWithoutSkirts = gltfInfo.positions;
  const normalsWithoutSkirts = gltfInfo.normals;
  const indicesWithoutSkirts = gltfInfo.indices;
  const vertexCountWithoutSkirts = positionsLocalWithoutSkirts.length / 3;
  const vertexCountWithSkirts = vertexCountWithoutSkirts + skirtVertexCount;
  const indexCountWithoutSkirts = indicesWithoutSkirts.length;
  const skirtIndexCount = TerrainProvider_default.getSkirtIndexCountWithFilledCorners(skirtVertexCount);
  const SizedIndexTypeWithSkirts = vertexCountWithSkirts <= 65535 ? Uint16Array : Uint32Array;
  const indexBufferWithSkirts = new SizedIndexTypeWithSkirts(
    indexCountWithoutSkirts + skirtIndexCount
  );
  indexBufferWithSkirts.set(indicesWithoutSkirts);
  const westIndices = new SizedIndexTypeWithSkirts(gltfInfo.edgeIndicesWest);
  const southIndices = new SizedIndexTypeWithSkirts(gltfInfo.edgeIndicesSouth);
  const eastIndices = new SizedIndexTypeWithSkirts(gltfInfo.edgeIndicesEast);
  const northIndices = new SizedIndexTypeWithSkirts(gltfInfo.edgeIndicesNorth);
  const sortedWestIndices = new SizedIndexTypeWithSkirts(westIndices).sort();
  const sortedSouthIndices = new SizedIndexTypeWithSkirts(southIndices).sort();
  const sortedEastIndices = new SizedIndexTypeWithSkirts(eastIndices).sort();
  const sortedNorthIndices = new SizedIndexTypeWithSkirts(northIndices).sort();
  const southMercatorAngle = WebMercatorProjection_default.geodeticLatitudeToMercatorAngle(tileMinLatitude);
  const northMercatorAngle = WebMercatorProjection_default.geodeticLatitudeToMercatorAngle(tileMaxLatitude);
  const oneOverMercatorHeight = 1 / (northMercatorAngle - southMercatorAngle);
  let minPosEnu = Cartesian3_default.fromElements(
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    scratchMinimumPositionENU
  );
  let maxPosEnu = Cartesian3_default.fromElements(
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    scratchMaximumPositionENU
  );
  const tempTerrainEncoding = new TerrainEncoding_default(
    boundingSphere.center,
    void 0,
    void 0,
    void 0,
    void 0,
    hasVertexNormals,
    hasWebMercatorT,
    hasGeodeticSurfaceNormals,
    exaggeration,
    exaggerationRelativeHeight
  );
  const tempBufferStride = tempTerrainEncoding.stride;
  const tempBuffer = new Float32Array(vertexCountWithSkirts * tempBufferStride);
  let tempBufferOffset = 0;
  for (let i = 0; i < vertexCountWithoutSkirts; i++) {
    const posLocal = Cartesian3_default.unpack(
      positionsLocalWithoutSkirts,
      i * 3,
      scratchPosLocal
    );
    const posECEF = Matrix4_default.multiplyByPoint(
      tilesetTransform,
      posLocal,
      scratchPosEcef
    );
    const cartographic = Cartographic_default.fromCartesian(
      posECEF,
      ellipsoid,
      scratchCartographic2
    );
    const { longitude, latitude, height } = cartographic;
    let u = (longitude - tileMinLongitude) / tileLengthLongitude;
    let v = (latitude - tileMinLatitude) / tileLengthLatitude;
    u = Math_default.clamp(u, 0, 1);
    v = Math_default.clamp(v, 0, 1);
    if (binarySearch_default(sortedWestIndices, i, sortedEdgeCompare) >= 0) {
      u = 0;
    } else if (binarySearch_default(sortedEastIndices, i, sortedEdgeCompare) >= 0) {
      u = 1;
    }
    if (binarySearch_default(sortedSouthIndices, i, sortedEdgeCompare) >= 0) {
      v = 0;
    } else if (binarySearch_default(sortedNorthIndices, i, sortedEdgeCompare) >= 0) {
      v = 1;
    }
    const uv = Cartesian2_default.fromElements(u, v, scratchUV);
    let normalOct;
    if (hasVertexNormals) {
      let normal = Cartesian3_default.unpack(
        normalsWithoutSkirts,
        i * 3,
        scratchNormal
      );
      normal = Matrix4_default.multiplyByPointAsVector(
        tilesetTransform,
        normal,
        scratchNormal
      );
      normal = Cartesian3_default.normalize(normal, scratchNormal);
      normalOct = AttributeCompression_default.octEncode(normal, scratchNormalOct);
    }
    let webMercatorT;
    if (hasWebMercatorT) {
      const mercatorAngle = WebMercatorProjection_default.geodeticLatitudeToMercatorAngle(latitude);
      webMercatorT = (mercatorAngle - southMercatorAngle) * oneOverMercatorHeight;
    }
    let geodeticSurfaceNormal;
    if (hasGeodeticSurfaceNormals) {
      geodeticSurfaceNormal = ellipsoid.geodeticSurfaceNormal(
        posECEF,
        scratchGeodeticSurfaceNormal
      );
    }
    tempBufferOffset = tempTerrainEncoding.encode(
      tempBuffer,
      tempBufferOffset,
      posECEF,
      uv,
      height,
      normalOct,
      webMercatorT,
      geodeticSurfaceNormal
    );
    const posEnu = Matrix4_default.multiplyByPoint(ecefToEnu, posECEF, scratchPosEnu);
    minPosEnu = Cartesian3_default.minimumByComponent(posEnu, minPosEnu, minPosEnu);
    maxPosEnu = Cartesian3_default.maximumByComponent(posEnu, maxPosEnu, maxPosEnu);
  }
  const mesh = new TerrainMesh_default(
    Cartesian3_default.clone(tempTerrainEncoding.center, new Cartesian3_default()),
    tempBuffer,
    indexBufferWithSkirts,
    indexCountWithoutSkirts,
    vertexCountWithoutSkirts,
    minimumHeight,
    maximumHeight,
    rectangle,
    BoundingSphere_default.clone(boundingSphere, new BoundingSphere_default()),
    Cartesian3_default.clone(horizonOcclusionPoint, new Cartesian3_default()),
    tempBufferStride,
    OrientedBoundingBox_default.clone(orientedBoundingBox, new OrientedBoundingBox_default()),
    tempTerrainEncoding,
    westIndices,
    southIndices,
    eastIndices,
    northIndices
  );
  addSkirtsToMesh(
    mesh,
    rectangle,
    ellipsoid,
    minPosEnu,
    maxPosEnu,
    enuToEcef,
    ecefToEnu,
    skirtHeight
  );
  return Promise.resolve(mesh);
};
var scratchMinUV = new Cartesian2_default();
var scratchMaxUV = new Cartesian2_default();
var scratchPolygonIndices = new Array(6);
var scratchUvA = new Cartesian2_default();
var scratchUvB = new Cartesian2_default();
var scratchUvC = new Cartesian2_default();
var scratchNormalA = new Cartesian3_default();
var scratchNormalB = new Cartesian3_default();
var scratchNormalC = new Cartesian3_default();
var scratchCenterCartographicUpsample = new Cartographic_default();
var scratchCenterCartesianUpsample = new Cartesian3_default();
var scratchCartographicSkirt = new Cartographic_default();
var scratchCartographicUpsample = new Cartographic_default();
var scratchPosEcefSkirt = new Cartesian3_default();
var scratchPosEcefUpsample = new Cartesian3_default();
var scratchPosEnuSkirt = new Cartesian3_default();
var scratchPosEnuUpsample = new Cartesian3_default();
var scratchMinimumPositionENUSkirt = new Cartesian3_default();
var scratchMaximumPositionENUSkirt = new Cartesian3_default();
var scratchMinimumPositionENUUpsample = new Cartesian3_default();
var scratchMaximumPositionENUUpsample = new Cartesian3_default();
var scratchEnuToEcefUpsample = new Matrix4_default();
var scratchEcefToEnuUpsample = new Matrix4_default();
var scratchUVSkirt = new Cartesian2_default();
var scratchUVUpsample = new Cartesian2_default();
var scratchHorizonOcclusionPoint = new Cartesian3_default();
var scratchBoundingSphere = new BoundingSphere_default();
var scratchOrientedBoundingBox = new OrientedBoundingBox_default();
var scratchAABBEnuSkirt = new AxisAlignedBoundingBox_default();
var scratchNormalUpsample = new Cartesian3_default();
var scratchNormalOctSkirt = new Cartesian2_default();
var scratchNormalOctUpsample = new Cartesian2_default();
var scratchGeodeticSurfaceNormalSkirt = new Cartesian3_default();
var scratchGeodeticSurfaceNormalUpsample = new Cartesian3_default();
function decodePositions(gltf) {
  const primitive = gltf.meshes[0].primitives[0];
  const accessor = gltf.accessors[primitive.attributes["POSITION"]];
  const bufferView = gltf.bufferViews[accessor.bufferView];
  const positionCount = accessor.count;
  const bufferViewMeshOpt = bufferView.extensions ? bufferView.extensions["EXT_meshopt_compression"] : void 0;
  if (bufferViewMeshOpt === void 0) {
    const buffer2 = gltf.buffers[bufferView.buffer].extras._pipeline.source;
    return new Float32Array(
      buffer2.buffer,
      buffer2.byteOffset + // offset from the start of the glb
      (bufferView.byteOffset ?? 0) + (accessor.byteOffset ?? 0),
      positionCount * 3
    );
  }
  const buffer = gltf.buffers[bufferViewMeshOpt.buffer].extras._pipeline.source;
  const compressedBuffer = new Uint8Array(
    buffer.buffer,
    buffer.byteOffset + // offset from the start of the glb
    (bufferViewMeshOpt.byteOffset ?? 0) + (accessor.byteOffset ?? 0),
    bufferViewMeshOpt.byteLength
  );
  const positionByteLength = bufferViewMeshOpt.byteStride;
  const PositionType = positionByteLength === 4 ? Uint8Array : Uint16Array;
  const positionsResult = new PositionType(positionCount * 4);
  MeshoptDecoder.decodeVertexBuffer(
    new Uint8Array(positionsResult.buffer),
    positionCount,
    positionByteLength,
    compressedBuffer
  );
  const positionStorageValueMax = (1 << positionsResult.BYTES_PER_ELEMENT * 8) - 1;
  const positions = new Float32Array(positionCount * 3);
  for (let p = 0; p < positionCount; p++) {
    positions[p * 3 + 0] = positionsResult[p * 4 + 0] / positionStorageValueMax;
    positions[p * 3 + 1] = positionsResult[p * 4 + 1] / positionStorageValueMax;
    positions[p * 3 + 2] = positionsResult[p * 4 + 2] / positionStorageValueMax;
  }
  return positions;
}
function decodeNormals(gltf) {
  const primitive = gltf.meshes[0].primitives[0];
  const accessor = gltf.accessors[primitive.attributes["NORMAL"]];
  const bufferView = gltf.bufferViews[accessor.bufferView];
  const normalCount = accessor.count;
  const bufferViewMeshOpt = bufferView.extensions ? bufferView.extensions["EXT_meshopt_compression"] : void 0;
  if (bufferViewMeshOpt === void 0) {
    const buffer2 = gltf.buffers[bufferView.buffer].extras._pipeline.source;
    return new Float32Array(
      buffer2.buffer,
      buffer2.byteOffset + // offset from the start of the glb
      (bufferView.byteOffset ?? 0) + (accessor.byteOffset ?? 0),
      normalCount * 3
    );
  }
  const buffer = gltf.buffers[bufferViewMeshOpt.buffer].extras._pipeline.source;
  const compressedBuffer = new Uint8Array(
    buffer.buffer,
    buffer.byteOffset + // offset from the start of the glb
    (bufferViewMeshOpt.byteOffset ?? 0) + (accessor.byteOffset ?? 0),
    bufferViewMeshOpt.byteLength
  );
  const normalByteLength = bufferViewMeshOpt.byteStride;
  const normalsResult = new Int8Array(normalCount * normalByteLength);
  MeshoptDecoder.decodeVertexBuffer(
    new Uint8Array(normalsResult.buffer),
    normalCount,
    normalByteLength,
    compressedBuffer
  );
  const normals = new Float32Array(normalCount * 3);
  for (let i = 0; i < normalCount; i++) {
    let octX = Math.max(normalsResult[i * 4 + 0] / 127, -1);
    let octY = Math.max(normalsResult[i * 4 + 1] / 127, -1);
    const octZ = 1 - (Math.abs(octX) + Math.abs(octY));
    if (octZ < 0) {
      const oldX = octX;
      const oldY = octY;
      octX = (1 - Math.abs(oldY)) * Math_default.signNotZero(oldX);
      octY = (1 - Math.abs(oldX)) * Math_default.signNotZero(oldY);
    }
    let normal = scratchNormal;
    normal.x = octX;
    normal.y = octY;
    normal.z = octZ;
    normal = Cartesian3_default.normalize(normal, scratchNormal);
    normals[i * 3 + 0] = normal.x;
    normals[i * 3 + 1] = normal.y;
    normals[i * 3 + 2] = normal.z;
  }
  return normals;
}
function decodeIndices(gltf) {
  const primitive = gltf.meshes[0].primitives[0];
  const accessor = gltf.accessors[primitive.indices];
  const bufferView = gltf.bufferViews[accessor.bufferView];
  const indexCount = accessor.count;
  const SizedIndexType = accessor.componentType === ComponentDatatype_default.UNSIGNED_SHORT ? Uint16Array : Uint32Array;
  const bufferViewMeshOpt = bufferView.extensions ? bufferView.extensions["EXT_meshopt_compression"] : void 0;
  if (bufferViewMeshOpt === void 0) {
    const buffer2 = gltf.buffers[bufferView.buffer].extras._pipeline.source;
    return new SizedIndexType(
      buffer2.buffer,
      buffer2.byteOffset + // offset from the glb
      (bufferView.byteOffset ?? 0) + (accessor.byteOffset ?? 0),
      indexCount
    );
  }
  const buffer = gltf.buffers[bufferViewMeshOpt.buffer].extras._pipeline.source;
  const compressedBuffer = new Uint8Array(
    buffer.buffer,
    buffer.byteOffset + // offset from the start of the glb
    (bufferViewMeshOpt.byteOffset ?? 0) + (accessor.byteOffset ?? 0),
    bufferViewMeshOpt.byteLength
  );
  const indices = new SizedIndexType(indexCount);
  MeshoptDecoder.decodeIndexBuffer(
    new Uint8Array(indices.buffer),
    indexCount,
    bufferViewMeshOpt.byteStride,
    compressedBuffer
  );
  return indices;
}
function decodeEdgeIndices(gltf, name) {
  const primitive = gltf.meshes[0].primitives[0];
  const accessor = gltf.accessors[primitive.extensions.CESIUM_tile_edges[name]];
  const bufferView = gltf.bufferViews[accessor.bufferView];
  const indexCount = accessor.count;
  const SizedIndexType = accessor.componentType === ComponentDatatype_default.UNSIGNED_SHORT ? Uint16Array : Uint32Array;
  const bufferViewMeshOpt = bufferView.extensions ? bufferView.extensions["EXT_meshopt_compression"] : void 0;
  if (bufferViewMeshOpt === void 0) {
    const buffer2 = gltf.buffers[bufferView.buffer].extras._pipeline.source;
    return new SizedIndexType(
      buffer2.buffer,
      buffer2.byteOffset + // offset from the glb
      (bufferView.byteOffset ?? 0) + (accessor.byteOffset ?? 0),
      indexCount
    );
  }
  const buffer = gltf.buffers[bufferViewMeshOpt.buffer].extras._pipeline.source;
  const compressedBuffer = new Uint8Array(
    buffer.buffer,
    buffer.byteOffset + // offset from the start of the glb
    (bufferViewMeshOpt.byteOffset ?? 0) + (accessor.byteOffset ?? 0),
    bufferViewMeshOpt.byteLength
  );
  const indices = new SizedIndexType(indexCount);
  const indexByteLength = bufferViewMeshOpt.byteStride;
  MeshoptDecoder.decodeIndexSequence(
    new Uint8Array(indices.buffer),
    indexCount,
    indexByteLength,
    compressedBuffer
  );
  return indices;
}
function decodeGltf(gltf, hasNormals, result) {
  result.positions = decodePositions(gltf);
  result.normals = hasNormals ? decodeNormals(gltf) : void 0;
  result.indices = decodeIndices(gltf);
  result.edgeIndicesWest = decodeEdgeIndices(gltf, "left");
  result.edgeIndicesSouth = decodeEdgeIndices(gltf, "bottom");
  result.edgeIndicesEast = decodeEdgeIndices(gltf, "right");
  result.edgeIndicesNorth = decodeEdgeIndices(gltf, "top");
  return result;
}
Cesium3DTilesTerrainGeometryProcessor.upsampleMesh = function(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  const {
    isEastChild,
    isNorthChild,
    parentMinimumHeight,
    parentMaximumHeight,
    skirtHeight
  } = options;
  Check_default.typeOf.bool("options.isEastChild", isEastChild);
  Check_default.typeOf.bool("options.isNorthChild", isNorthChild);
  Check_default.typeOf.object("options.parentVertices", options.parentVertices);
  Check_default.typeOf.object("options.parentIndices", options.parentIndices);
  Check_default.typeOf.number(
    "options.parentVertexCountWithoutSkirts",
    options.parentVertexCountWithoutSkirts
  );
  Check_default.typeOf.number(
    "options.parentIndexCountWithoutSkirts",
    options.parentIndexCountWithoutSkirts
  );
  Check_default.typeOf.number("options.parentMinimumHeight", parentMinimumHeight);
  Check_default.typeOf.number("options.parentMaximumHeight", parentMaximumHeight);
  Check_default.typeOf.object("options.parentEncoding", options.parentEncoding);
  Check_default.typeOf.object("options.rectangle", options.rectangle);
  Check_default.typeOf.number("options.skirtHeight", skirtHeight);
  Check_default.typeOf.object("options.ellipsoid", options.ellipsoid);
  const indexCount = options.parentIndexCountWithoutSkirts;
  const indices = options.parentIndices;
  const vertexCount = options.parentVertexCountWithoutSkirts;
  const vertexBuffer = options.parentVertices;
  const encoding = TerrainEncoding_default.clone(
    options.parentEncoding,
    new TerrainEncoding_default()
  );
  const hasVertexNormals = encoding.hasVertexNormals;
  const hasWebMercatorT = encoding.hasWebMercatorT;
  const exaggeration = encoding.exaggeration;
  const exaggerationRelativeHeight = encoding.exaggerationRelativeHeight;
  const hasExaggeration = exaggeration !== 1;
  const hasGeodeticSurfaceNormals = hasExaggeration;
  const upsampleRectangle = Rectangle_default.clone(options.rectangle, new Rectangle_default());
  const ellipsoid = Ellipsoid_default.clone(options.ellipsoid);
  const upsampledTriIDs = [];
  const upsampledUVs = [];
  const upsampledBarys = [];
  const upsampledIndices = [];
  const upsampledWestIndices = [];
  const upsampledSouthIndices = [];
  const upsampledEastIndices = [];
  const upsampledNorthIndices = [];
  clipTileFromQuadrant(
    isEastChild,
    isNorthChild,
    indexCount,
    indices,
    vertexCount,
    vertexBuffer,
    encoding,
    upsampledIndices,
    upsampledWestIndices,
    upsampledSouthIndices,
    upsampledEastIndices,
    upsampledNorthIndices,
    upsampledTriIDs,
    upsampledBarys,
    upsampledUVs
  );
  const approximateCenterCartographic = Rectangle_default.center(
    upsampleRectangle,
    scratchCenterCartographicUpsample
  );
  approximateCenterCartographic.height = 0.5 * (parentMinimumHeight + parentMaximumHeight);
  const approximateCenterPosition = Cartographic_default.toCartesian(
    approximateCenterCartographic,
    ellipsoid,
    scratchCenterCartesianUpsample
  );
  const upsampledVertexCountWithoutSkirts = upsampledTriIDs.length;
  const upsampledTerrainEncoding = new TerrainEncoding_default(
    approximateCenterPosition,
    void 0,
    void 0,
    void 0,
    void 0,
    hasVertexNormals,
    hasWebMercatorT,
    hasGeodeticSurfaceNormals,
    exaggeration,
    exaggerationRelativeHeight
  );
  const upsampledVertexBufferStride = upsampledTerrainEncoding.stride;
  const upsampledSkirtVertexCount = TerrainProvider_default.getSkirtVertexCount(
    upsampledWestIndices,
    upsampledSouthIndices,
    upsampledEastIndices,
    upsampledNorthIndices
  );
  const upsampledVertexCountWithSkirts = upsampledVertexCountWithoutSkirts + upsampledSkirtVertexCount;
  const upsampledIndexCountWithoutSkirts = upsampledIndices.length;
  const upsampledSkirtIndexCount = TerrainProvider_default.getSkirtIndexCountWithFilledCorners(
    upsampledSkirtVertexCount
  );
  const upsampledIndexCountWithSkirts = upsampledIndexCountWithoutSkirts + upsampledSkirtIndexCount;
  const SizedIndexTypeWithSkirts = upsampledVertexCountWithSkirts <= 65535 ? Uint16Array : Uint32Array;
  const upsampledIndexBuffer = new SizedIndexTypeWithSkirts(
    upsampledIndexCountWithSkirts
  );
  upsampledIndexBuffer.set(upsampledIndices);
  const upsampledWestIndicesBuffer = new SizedIndexTypeWithSkirts(
    upsampledWestIndices
  );
  const upsampledSouthIndicesBuffer = new SizedIndexTypeWithSkirts(
    upsampledSouthIndices
  );
  const upsampledEastIndicesBuffer = new SizedIndexTypeWithSkirts(
    upsampledEastIndices
  );
  const upsampledNorthIndicesBuffer = new SizedIndexTypeWithSkirts(
    upsampledNorthIndices
  );
  const upsampledVertexBuffer = new Float32Array(
    upsampledVertexCountWithSkirts * upsampledVertexBufferStride
  );
  let upsampledVertexBufferOffset = 0;
  const enuToEcef = FixedFrameTransforms_default.eastNorthUpToFixedFrame(
    approximateCenterPosition,
    ellipsoid,
    scratchEnuToEcefUpsample
  );
  const ecefToEnu = Matrix4_default.inverseTransformation(
    enuToEcef,
    scratchEcefToEnuUpsample
  );
  const minimumLongitude = upsampleRectangle.west;
  const maximumLongitude = upsampleRectangle.east;
  const minimumLatitude = upsampleRectangle.south;
  const maximumLatitude = upsampleRectangle.north;
  const southMercatorAngle = WebMercatorProjection_default.geodeticLatitudeToMercatorAngle(minimumLatitude);
  const northMercatorAngle = WebMercatorProjection_default.geodeticLatitudeToMercatorAngle(maximumLatitude);
  const oneOverMercatorHeight = 1 / (northMercatorAngle - southMercatorAngle);
  let minimumHeight = Number.POSITIVE_INFINITY;
  let maximumHeight = Number.NEGATIVE_INFINITY;
  let minPosEnu = Cartesian3_default.fromElements(
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    scratchMinimumPositionENUUpsample
  );
  let maxPosEnu = Cartesian3_default.fromElements(
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    scratchMaximumPositionENUUpsample
  );
  for (let i = 0; i < upsampledVertexCountWithoutSkirts; i++) {
    const triId = upsampledTriIDs[i];
    const indexA = indices[triId * 3 + 0];
    const indexB = indices[triId * 3 + 1];
    const indexC = indices[triId * 3 + 2];
    const uv = scratchUVUpsample;
    uv.x = upsampledUVs[i * 2 + 0];
    uv.y = upsampledUVs[i * 2 + 1];
    const u = uv.x;
    const v = uv.y;
    const baryA = upsampledBarys[i * 2 + 0];
    const baryB = upsampledBarys[i * 2 + 1];
    const baryC = 1 - baryA - baryB;
    const heightA = encoding.decodeHeight(vertexBuffer, indexA);
    const heightB = encoding.decodeHeight(vertexBuffer, indexB);
    const heightC = encoding.decodeHeight(vertexBuffer, indexC);
    const height = heightA * baryA + heightB * baryB + heightC * baryC;
    minimumHeight = Math.min(height, minimumHeight);
    maximumHeight = Math.max(height, maximumHeight);
    const lon = Math_default.lerp(minimumLongitude, maximumLongitude, u);
    const lat = Math_default.lerp(minimumLatitude, maximumLatitude, v);
    const carto = Cartographic_default.fromRadians(
      lon,
      lat,
      height,
      scratchCartographicUpsample
    );
    const position = Cartographic_default.toCartesian(
      carto,
      ellipsoid,
      scratchPosEcefUpsample
    );
    const posEnu = Matrix4_default.multiplyByPoint(
      ecefToEnu,
      position,
      scratchPosEnuUpsample
    );
    minPosEnu = Cartesian3_default.minimumByComponent(posEnu, minPosEnu, minPosEnu);
    maxPosEnu = Cartesian3_default.maximumByComponent(posEnu, maxPosEnu, maxPosEnu);
    let normalOct;
    if (hasVertexNormals) {
      const normalA = encoding.decodeNormal(
        vertexBuffer,
        indexA,
        scratchNormalA
      );
      const normalB = encoding.decodeNormal(
        vertexBuffer,
        indexB,
        scratchNormalB
      );
      const normalC = encoding.decodeNormal(
        vertexBuffer,
        indexC,
        scratchNormalC
      );
      let normal = Cartesian3_default.fromElements(
        normalA.x * baryA + normalB.x * baryB + normalC.x * baryC,
        normalA.y * baryA + normalB.y * baryB + normalC.y * baryC,
        normalA.z * baryA + normalB.z * baryB + normalC.z * baryC,
        scratchNormalUpsample
      );
      normal = Cartesian3_default.normalize(normal, scratchNormalUpsample);
      normalOct = AttributeCompression_default.octEncode(
        normal,
        scratchNormalOctUpsample
      );
    }
    let webMercatorT;
    if (hasWebMercatorT) {
      const mercatorAngle = WebMercatorProjection_default.geodeticLatitudeToMercatorAngle(lat);
      webMercatorT = (mercatorAngle - southMercatorAngle) * oneOverMercatorHeight;
    }
    let geodeticSurfaceNormal;
    if (hasGeodeticSurfaceNormals) {
      geodeticSurfaceNormal = ellipsoid.geodeticSurfaceNormal(
        position,
        scratchGeodeticSurfaceNormalUpsample
      );
    }
    upsampledVertexBufferOffset = upsampledTerrainEncoding.encode(
      upsampledVertexBuffer,
      upsampledVertexBufferOffset,
      position,
      uv,
      height,
      normalOct,
      webMercatorT,
      geodeticSurfaceNormal
    );
  }
  const orientedBoundingBox = OrientedBoundingBox_default.fromRectangle(
    upsampleRectangle,
    minimumHeight,
    maximumHeight,
    ellipsoid,
    scratchOrientedBoundingBox
  );
  const boundingSphere = BoundingSphere_default.fromVertices(
    upsampledVertexBuffer,
    upsampledTerrainEncoding.center,
    upsampledVertexBufferStride,
    scratchBoundingSphere
  );
  const occluder = new EllipsoidalOccluder_default(ellipsoid);
  const horizonOcclusionPoint = occluder.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(
    upsampledTerrainEncoding.center,
    // vector from ellipsoid center to horizon occlusion point
    upsampledVertexBuffer,
    upsampledVertexBufferStride,
    upsampledTerrainEncoding.center,
    minimumHeight,
    scratchHorizonOcclusionPoint
  );
  const upsampledMesh = new TerrainMesh_default(
    Cartesian3_default.clone(upsampledTerrainEncoding.center, new Cartesian3_default()),
    upsampledVertexBuffer,
    upsampledIndexBuffer,
    upsampledIndexCountWithoutSkirts,
    upsampledVertexCountWithoutSkirts,
    minimumHeight,
    maximumHeight,
    upsampleRectangle,
    BoundingSphere_default.clone(boundingSphere),
    Cartesian3_default.clone(horizonOcclusionPoint),
    upsampledVertexBufferStride,
    OrientedBoundingBox_default.clone(orientedBoundingBox),
    upsampledTerrainEncoding,
    upsampledWestIndicesBuffer,
    upsampledSouthIndicesBuffer,
    upsampledEastIndicesBuffer,
    upsampledNorthIndicesBuffer
  );
  addSkirtsToMesh(
    upsampledMesh,
    upsampleRectangle,
    ellipsoid,
    minPosEnu,
    maxPosEnu,
    enuToEcef,
    ecefToEnu,
    skirtHeight
  );
  return upsampledMesh;
};
function addSkirtsToMesh(mesh, rectangle, ellipsoid, enuMinimum, enuMaximum, enuToEcef, ecefToEnu, skirtHeight) {
  const { encoding } = mesh;
  const vertexStride = encoding.stride;
  const vertexBuffer = mesh.vertices;
  const {
    hasVertexNormals,
    hasWebMercatorT,
    exaggeration,
    exaggerationRelativeHeight
  } = encoding;
  const hasExaggeration = exaggeration !== 1;
  const hasGeodeticSurfaceNormals = hasExaggeration;
  const vertexCountWithoutSkirts = mesh.vertexCountWithoutSkirts;
  let vertexBufferOffset = vertexCountWithoutSkirts * vertexStride;
  const vertexCountWithSkirts = vertexBuffer.length / vertexStride;
  const skirtVertexCount = vertexCountWithSkirts - vertexCountWithoutSkirts;
  const indices = mesh.indices;
  const indexCountWithoutSkirts = mesh.indexCountWithoutSkirts;
  const westIndices = mesh.westIndicesSouthToNorth;
  const southIndices = mesh.southIndicesEastToWest;
  const eastIndices = mesh.eastIndicesNorthToSouth;
  const northIndices = mesh.northIndicesWestToEast;
  TerrainProvider_default.addSkirtIndicesWithFilledCorners(
    westIndices,
    southIndices,
    eastIndices,
    northIndices,
    vertexCountWithoutSkirts,
    indices,
    indexCountWithoutSkirts
  );
  const westOffset = 0;
  const southOffset = westOffset + westIndices.length;
  const eastOffset = southOffset + southIndices.length;
  const northOffset = eastOffset + eastIndices.length;
  const edges = [westIndices, southIndices, eastIndices, northIndices];
  const edgeIndexOffset = [westOffset, southOffset, eastOffset, northOffset];
  const edgeLongitudeSign = [-1, 0, 1, 0];
  const edgeLatitudeSign = [0, -1, 0, 1];
  const minimumPositionENUWithSkirts = Cartesian3_default.clone(
    enuMinimum,
    scratchMinimumPositionENUSkirt
  );
  const maximumPositionENUWithSkirts = Cartesian3_default.clone(
    enuMaximum,
    scratchMaximumPositionENUSkirt
  );
  const maximumHeight = mesh.maximumHeight;
  const minimumHeightWithSkirts = mesh.minimumHeight - skirtHeight;
  for (let skirtId = 0; skirtId < skirtVertexCount; skirtId++) {
    let side;
    for (side = 0; side < 3; side++) {
      if (skirtId < edgeIndexOffset[side + 1]) {
        break;
      }
    }
    const vertexIndex = edges[side][skirtId - edgeIndexOffset[side]];
    const uv = encoding.decodeTextureCoordinates(
      vertexBuffer,
      vertexIndex,
      scratchUVSkirt
    );
    const skirtLonLatOffsetPercent = 1e-4;
    const longitudeT = uv.x + edgeLongitudeSign[side] * skirtLonLatOffsetPercent;
    const latitudeT = uv.y + edgeLatitudeSign[side] * skirtLonLatOffsetPercent;
    const longitude = Math_default.lerp(
      rectangle.west,
      rectangle.east,
      longitudeT
    );
    const latitude = Math_default.clamp(
      Math_default.lerp(rectangle.south, rectangle.north, latitudeT),
      -Math_default.PI_OVER_TWO,
      +Math_default.PI_OVER_TWO
    );
    const vertHeight = encoding.decodeHeight(vertexBuffer, vertexIndex);
    const height = vertHeight - skirtHeight;
    const cartographic = Cartographic_default.fromRadians(
      longitude,
      latitude,
      height,
      scratchCartographicSkirt
    );
    const positionEcef = Cartographic_default.toCartesian(
      cartographic,
      ellipsoid,
      scratchPosEcefSkirt
    );
    let normalOct;
    if (hasVertexNormals) {
      normalOct = encoding.getOctEncodedNormal(
        vertexBuffer,
        vertexIndex,
        scratchNormalOctSkirt
      );
    }
    let webMercatorT;
    if (hasWebMercatorT) {
      webMercatorT = encoding.decodeWebMercatorT(vertexBuffer, vertexIndex);
    }
    let geodeticSurfaceNormal;
    if (hasGeodeticSurfaceNormals) {
      geodeticSurfaceNormal = ellipsoid.geodeticSurfaceNormal(
        positionEcef,
        scratchGeodeticSurfaceNormalSkirt
      );
    }
    vertexBufferOffset = encoding.encode(
      vertexBuffer,
      vertexBufferOffset,
      positionEcef,
      uv,
      height,
      normalOct,
      webMercatorT,
      geodeticSurfaceNormal
    );
    const positionENU = Matrix4_default.multiplyByPoint(
      ecefToEnu,
      positionEcef,
      scratchPosEnuSkirt
    );
    Cartesian3_default.minimumByComponent(
      positionENU,
      minimumPositionENUWithSkirts,
      minimumPositionENUWithSkirts
    );
    Cartesian3_default.maximumByComponent(
      positionENU,
      maximumPositionENUWithSkirts,
      maximumPositionENUWithSkirts
    );
  }
  const aabbEnuWithSkirts = AxisAlignedBoundingBox_default.fromCorners(
    minimumPositionENUWithSkirts,
    maximumPositionENUWithSkirts,
    scratchAABBEnuSkirt
  );
  const encodingWithSkirts = new TerrainEncoding_default(
    encoding.center,
    aabbEnuWithSkirts,
    minimumHeightWithSkirts,
    maximumHeight,
    enuToEcef,
    encoding.hasVertexNormals,
    encoding.hasWebMercatorT,
    hasGeodeticSurfaceNormals,
    exaggeration,
    exaggerationRelativeHeight
  );
  if (encoding.quantization !== encodingWithSkirts.quantization) {
    const finalEncoding = encodingWithSkirts;
    const finalVertexStride = finalEncoding.stride;
    const finalVertexBuffer = new Float32Array(
      vertexCountWithSkirts * finalVertexStride
    );
    let finalVertexBufferOffset = 0;
    for (let i = 0; i < vertexCountWithSkirts; i++) {
      finalVertexBufferOffset = finalEncoding.encode(
        finalVertexBuffer,
        finalVertexBufferOffset,
        encoding.decodePosition(vertexBuffer, i, scratchPosEcefSkirt),
        encoding.decodeTextureCoordinates(vertexBuffer, i, scratchUVSkirt),
        encoding.decodeHeight(vertexBuffer, i),
        encoding.hasVertexNormals ? encoding.getOctEncodedNormal(vertexBuffer, i, scratchNormalOctSkirt) : void 0,
        encoding.hasWebMercatorT ? encoding.decodeWebMercatorT(vertexBuffer, i) : void 0,
        encoding.hasGeodeticSurfaceNormals ? encoding.decodeGeodeticSurfaceNormal(
          vertexBuffer,
          i,
          scratchGeodeticSurfaceNormalSkirt
        ) : void 0
      );
    }
    mesh.vertices = finalVertexBuffer;
    mesh.stride = finalVertexStride;
    mesh.encoding = finalEncoding;
  }
  return mesh;
}
var EDGE_ID_LEFT = 0;
var EDGE_ID_TOP = 1;
var EDGE_ID_RIGHT = 2;
var EDGE_ID_BOTTOM = 3;
var EDGE_COUNT = 4;
var scratchIntersection = new Cartesian3_default();
var scratchInBarys = [
  new Cartesian3_default(),
  new Cartesian3_default(),
  new Cartesian3_default(),
  new Cartesian3_default(),
  new Cartesian3_default(),
  new Cartesian3_default()
];
var scratchInPoints = [
  new Cartesian2_default(),
  new Cartesian2_default(),
  new Cartesian2_default(),
  new Cartesian2_default(),
  new Cartesian2_default(),
  new Cartesian2_default()
];
var scratchOutBarys = [
  new Cartesian3_default(),
  new Cartesian3_default(),
  new Cartesian3_default(),
  new Cartesian3_default(),
  new Cartesian3_default(),
  new Cartesian3_default()
];
var scratchOutPoints = [
  new Cartesian2_default(),
  new Cartesian2_default(),
  new Cartesian2_default(),
  new Cartesian2_default(),
  new Cartesian2_default(),
  new Cartesian2_default()
];
function inside(boxMinimum, boxMaximum, edgeId, p) {
  switch (edgeId) {
    case EDGE_ID_LEFT:
      return Math_default.sign(p.x - boxMinimum.x);
    case EDGE_ID_RIGHT:
      return Math_default.sign(boxMaximum.x - p.x);
    case EDGE_ID_BOTTOM:
      return Math_default.sign(p.y - boxMinimum.y);
    default:
      return Math_default.sign(boxMaximum.y - p.y);
  }
}
function intersect(boxMinimum, boxMaximum, edgeId, a, b, result) {
  let t, intersectX, intersectY;
  switch (edgeId) {
    case EDGE_ID_LEFT:
      t = (boxMinimum.x - a.x) / (b.x - a.x);
      intersectX = boxMinimum.x;
      intersectY = a.y + (b.y - a.y) * t;
      break;
    case EDGE_ID_RIGHT:
      t = (boxMaximum.x - a.x) / (b.x - a.x);
      intersectX = boxMaximum.x;
      intersectY = a.y + (b.y - a.y) * t;
      break;
    case EDGE_ID_BOTTOM:
      t = (boxMinimum.y - a.y) / (b.y - a.y);
      intersectX = a.x + (b.x - a.x) * t;
      intersectY = boxMinimum.y;
      break;
    default:
      t = (boxMaximum.y - a.y) / (b.y - a.y);
      intersectX = a.x + (b.x - a.x) * t;
      intersectY = boxMaximum.y;
      break;
  }
  return Cartesian3_default.fromElements(intersectX, intersectY, t, result);
}
var scratchPolygon = {
  length: 0,
  coordinates: [
    new Cartesian2_default(),
    new Cartesian2_default(),
    new Cartesian2_default(),
    new Cartesian2_default(),
    new Cartesian2_default(),
    new Cartesian2_default()
  ],
  barycentricCoordinates: [
    new Cartesian3_default(),
    new Cartesian3_default(),
    new Cartesian3_default(),
    new Cartesian3_default(),
    new Cartesian3_default(),
    new Cartesian3_default()
  ]
};
function clipTriangleAgainstBoxEdgeRange(edgeStart, edgeCount, boxMinimum, boxMaximum, p0, p1, p2, result) {
  let inputLength;
  let inputPoints = scratchInPoints;
  let inputBarys = scratchInBarys;
  let outputLength = 3;
  let outputPoints = scratchOutPoints;
  Cartesian2_default.clone(p0, outputPoints[0]);
  Cartesian2_default.clone(p1, outputPoints[1]);
  Cartesian2_default.clone(p2, outputPoints[2]);
  let outputBarys = scratchOutBarys;
  Cartesian3_default.fromElements(1, 0, 0, outputBarys[0]);
  Cartesian3_default.fromElements(0, 1, 0, outputBarys[1]);
  Cartesian3_default.fromElements(0, 0, 1, outputBarys[2]);
  for (let e = 0; e < edgeCount; e++) {
    const edgeId = (edgeStart + e) % EDGE_COUNT;
    const tempPoints = inputPoints;
    const tempBarys = inputBarys;
    inputPoints = outputPoints;
    inputBarys = outputBarys;
    inputLength = outputLength;
    outputPoints = tempPoints;
    outputBarys = tempBarys;
    outputLength = 0;
    const prevIdx = inputLength - 1;
    let prevPoint = inputPoints[prevIdx];
    let prevBary = inputBarys[prevIdx];
    let prevInside = inside(boxMinimum, boxMaximum, edgeId, prevPoint);
    for (let currIdx = 0; currIdx < inputLength; currIdx++) {
      const currPoint = inputPoints[currIdx];
      const currBary = inputBarys[currIdx];
      const currInside = inside(boxMinimum, boxMaximum, edgeId, currPoint);
      if (prevInside * currInside === -1) {
        const intersection = intersect(
          boxMinimum,
          boxMaximum,
          edgeId,
          prevPoint,
          currPoint,
          scratchIntersection
        );
        const { x, y, z: t } = intersection;
        const tInv = 1 - t;
        const baryA = prevBary.x * tInv + currBary.x * t;
        const baryB = prevBary.y * tInv + currBary.y * t;
        const baryC = prevBary.z * tInv + currBary.z * t;
        Cartesian2_default.fromElements(x, y, outputPoints[outputLength]);
        Cartesian3_default.fromElements(baryA, baryB, baryC, outputBarys[outputLength]);
        outputLength++;
      }
      if (currInside >= 0) {
        Cartesian2_default.clone(currPoint, outputPoints[outputLength]);
        Cartesian3_default.clone(currBary, outputBarys[outputLength]);
        outputLength++;
      }
      prevPoint = currPoint;
      prevBary = currBary;
      prevInside = currInside;
    }
    if (outputLength === 0) {
      break;
    }
  }
  result.length = outputLength;
  for (let i = 0; i < outputLength; i++) {
    Cartesian2_default.clone(outputPoints[i], result.coordinates[i]);
    Cartesian3_default.clone(outputBarys[i], result.barycentricCoordinates[i]);
  }
  return result;
}
function clipTriangleFromQuadrant(isEastChild, isNorthChild, boxMinimum, boxMaximum, p0, p1, p2, result) {
  const edgeStart = isEastChild ? isNorthChild ? EDGE_ID_BOTTOM : EDGE_ID_LEFT : isNorthChild ? EDGE_ID_RIGHT : EDGE_ID_TOP;
  return clipTriangleAgainstBoxEdgeRange(
    edgeStart,
    2,
    boxMinimum,
    boxMaximum,
    p0,
    p1,
    p2,
    result
  );
}
var lookUpTableBaryToPrim = [
  [],
  // 000
  [0],
  // 001
  [1],
  // 010
  [0, 1],
  // 011
  [2],
  // 100
  [0, 2],
  // 101
  [1, 2],
  // 110
  [0, 1, 2]
  // 111
];
function clipTileFromQuadrant(isEastChild, isNorthChild, indexCount, indices, vertexCount, vertices, vertexEncoding, resultIndices, resultWestIndices, resultSouthIndices, resultEastIndices, resultNorthIndices, resultTriIds, resultBary, resultUVs) {
  const upsampledVertexMap = {};
  const minU = isEastChild ? 0.5 : 0;
  const maxU = isEastChild ? 1 : 0.5;
  const minV = isNorthChild ? 0.5 : 0;
  const maxV = isNorthChild ? 1 : 0.5;
  const minUV = scratchMinUV;
  minUV.x = minU;
  minUV.y = minV;
  const maxUV = scratchMaxUV;
  maxUV.x = maxU;
  maxUV.y = maxV;
  let upsampledVertexCount = 0;
  for (let i = 0; i < indexCount; i += 3) {
    const indexA = indices[i + 0];
    const indexB = indices[i + 1];
    const indexC = indices[i + 2];
    const uvA = vertexEncoding.decodeTextureCoordinates(
      vertices,
      indexA,
      scratchUvA
    );
    const uvB = vertexEncoding.decodeTextureCoordinates(
      vertices,
      indexB,
      scratchUvB
    );
    const uvC = vertexEncoding.decodeTextureCoordinates(
      vertices,
      indexC,
      scratchUvC
    );
    const clippedPolygon = clipTriangleFromQuadrant(
      isEastChild,
      isNorthChild,
      minUV,
      maxUV,
      uvA,
      uvB,
      uvC,
      scratchPolygon
    );
    const clippedPolygonLength = clippedPolygon.length;
    if (clippedPolygonLength < 3) {
      continue;
    }
    const polygonUpsampledIndices = scratchPolygonIndices;
    for (let p = 0; p < clippedPolygonLength; p++) {
      const polygonBary = clippedPolygon.barycentricCoordinates[p];
      const bA = polygonBary.x;
      const bB = polygonBary.y;
      const bC = polygonBary.z;
      const baryId = Math.ceil(bA) | Math.ceil(bB) << 1 | Math.ceil(bC) << 2;
      const primitiveIds = lookUpTableBaryToPrim[baryId];
      let upsampledIndex;
      let isNewVertex = false;
      if (primitiveIds.length === 1) {
        const pointPrimitiveId = primitiveIds[0];
        const pointIndex = indices[i + pointPrimitiveId];
        const pointKey = pointIndex;
        upsampledIndex = upsampledVertexMap[pointKey];
        if (upsampledIndex === void 0) {
          isNewVertex = true;
          upsampledIndex = upsampledVertexCount++;
          upsampledVertexMap[pointKey] = upsampledIndex;
        }
      } else if (primitiveIds.length === 2) {
        const edgePrimitiveIdA = primitiveIds[0];
        const edgePrimitiveIdB = primitiveIds[1];
        const edgeIndexA = indices[i + edgePrimitiveIdA];
        const edgeIndexB = indices[i + edgePrimitiveIdB];
        const prevBary = clippedPolygon.barycentricCoordinates[(p + clippedPolygonLength - 1) % clippedPolygonLength];
        const prevBaryId = Math.ceil(prevBary.x) | Math.ceil(prevBary.y) << 1 | Math.ceil(prevBary.z) << 2;
        const sameEdge = baryId === prevBaryId;
        const minIndex = Math.min(edgeIndexA, edgeIndexB);
        const maxIndex = Math.max(edgeIndexA, edgeIndexB);
        const baseKey = vertexCount + 2 * (minIndex * vertexCount + maxIndex);
        const firstKey = baseKey + 0;
        const secondKey = baseKey + 1;
        const firstEntry = upsampledVertexMap[firstKey];
        const secondEntry = upsampledVertexMap[secondKey];
        const useFirst = !sameEdge === (firstEntry === void 0 || secondEntry === void 0);
        upsampledIndex = useFirst ? firstEntry : secondEntry;
        if (upsampledIndex === void 0) {
          isNewVertex = true;
          upsampledIndex = upsampledVertexCount++;
          const edgeKey = useFirst ? firstKey : secondKey;
          upsampledVertexMap[edgeKey] = upsampledIndex;
        }
      } else {
        isNewVertex = true;
        upsampledIndex = upsampledVertexCount++;
      }
      polygonUpsampledIndices[p] = upsampledIndex;
      if (isNewVertex) {
        const triId = i / 3;
        resultTriIds.push(triId);
        const polygonUV = clippedPolygon.coordinates[p];
        const u = (polygonUV.x - minU) / (maxU - minU);
        const v = (polygonUV.y - minV) / (maxV - minV);
        resultUVs.push(u, v);
        resultBary.push(bA, bB);
        if (u === 0) {
          resultWestIndices.push(upsampledIndex);
        } else if (u === 1) {
          resultEastIndices.push(upsampledIndex);
        }
        if (v === 0) {
          resultSouthIndices.push(upsampledIndex);
        } else if (v === 1) {
          resultNorthIndices.push(upsampledIndex);
        }
      }
    }
    const ui0 = polygonUpsampledIndices[0];
    let ui1 = polygonUpsampledIndices[1];
    let ui2 = polygonUpsampledIndices[2];
    resultIndices.push(ui0, ui1, ui2);
    for (let j = 3; j < clippedPolygonLength; j++) {
      ui1 = ui2;
      ui2 = polygonUpsampledIndices[j];
      resultIndices.push(ui0, ui1, ui2);
    }
  }
  resultWestIndices.sort(function(a, b) {
    return resultUVs[a * 2 + 1] - resultUVs[b * 2 + 1];
  });
  resultSouthIndices.sort(function(a, b) {
    return resultUVs[b * 2 + 0] - resultUVs[a * 2 + 0];
  });
  resultEastIndices.sort(function(a, b) {
    return resultUVs[b * 2 + 1] - resultUVs[a * 2 + 1];
  });
  resultNorthIndices.sort(function(a, b) {
    return resultUVs[a * 2 + 0] - resultUVs[b * 2 + 0];
  });
}
var Cesium3DTilesTerrainGeometryProcessor_default = Cesium3DTilesTerrainGeometryProcessor;

export {
  Cesium3DTilesTerrainGeometryProcessor_default
};
