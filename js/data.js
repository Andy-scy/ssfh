/* ==========================================================
   盛世泛海官网（v2） — 内容数据层
   修改文案 / 增删案例与客户，只需编辑本文件
   ========================================================== */
window.SSFH_DATA = {

  /* ---------- 跑马灯客户 ---------- */
  marquee: [
    '国家开发银行', '中国地震局', '中国科学院', '航天工程大学', '国家核电大厦',
    '人保财险北京分公司', '北京财富金融中心', '远洋国际中心', '龙湖·长楹天街',
    '润泽公馆', '中粮万科·长阳半岛', '知行车谷', '东方艺珍花丝镶嵌厂', '中国人民解放军63926部队'
  ],

  /* ---------- 业务范围 ---------- */
  services: [
    {
      no: '01',
      title: '物业修缮工程',
      desc: '楼宇全生命周期修缮与机电设施改造：智能电表更换、中央空调升级改造、静电地板翻新、防火门更换、管道保温、井盖维修更换等。',
      tags: ['机电维保', '设施升级'],
      img: 'images/svc-repair.jpg'
    },
    {
      no: '02',
      title: '装饰装修工程',
      desc: '办公区、展厅、门店与展台的装饰装修与升级改造，从设计图纸到施工现场全程把控，严格质量管理确保交付品质。',
      tags: ['展馆展厅', '办公门店'],
      img: 'images/svc-deco.jpg'
    },
    {
      no: '03',
      title: '防水工程',
      desc: '屋面、彩钢顶、阳光房玻璃顶及大型外露景观水系的防水维修与升级改造，单项目最大施工面积达 26,000 平米。',
      tags: ['屋面防水', '景观水系'],
      img: 'images/svc-waterproof.jpg'
    },
    {
      no: '04',
      title: '亮化工程',
      desc: '户外亮化工程项目设计与施工、专业场馆灯具供应及安装，用灯光点亮空间，兼顾美观与节能。',
      tags: ['灯具供应', '夜景施工'],
      img: 'images/svc-lighting.jpg'
    }
  ],

  devices: ['环保建材', '制冷设备', '通风设备', '空气净化设备', '净水设备'],
  moreServices: ['机电维保大修', '排油烟设施升级改造', '展台搭建', '户外游乐园设计施工', '泛海花艺'],

  /* ---------- 服务流程 ---------- */
  process: [
    { step: '01', title: '需求沟通', desc: '明确修缮范围、工期与预算区间' },
    { step: '02', title: '现场勘察', desc: '工程师上门核实工况与工程量' },
    { step: '03', title: '方案报价', desc: '出具施工方案与透明报价单' },
    { step: '04', title: '规范施工', desc: '环保材料进场，按规范流程作业' },
    { step: '05', title: '验收维保', desc: '竣工验收交付，提供后续保障' }
  ],

  /* ---------- 工程案例 ---------- */
  caseFilters: [
    { key: 'all', label: '全部' },
    { key: 'waterproof', label: '防水工程' },
    { key: 'mep', label: '机电改造' },
    { key: 'deco', label: '装饰装修' },
    { key: 'expo', label: '展馆展厅' },
    { key: 'lighting', label: '亮化工程' }
  ],
  cases: [
    { cat: 'waterproof', img: 'images/case-roof-blue.jpg',      title: '彩钢顶防水维修',       desc: '中国机床产业园区 26000㎡ 彩钢顶防水维修及升级改造' },
    { cat: 'waterproof', img: 'images/case-roof-site.jpg',      title: '屋顶防水维修',         desc: '辽宁省体育宫屋顶防水维修施工' },
    { cat: 'waterproof', img: 'images/case-water-gazebo.jpg',   title: '景观水系升级改造',     desc: '大型外露景观水系防水维修及升级改造' },
    { cat: 'waterproof', img: 'images/case-water-stream.jpg',   title: '水系改造完成效果',     desc: '防水完成后整体升级改造效果' },
    { cat: 'waterproof', img: 'images/case-water-fountain.jpg', title: '水景喷泉改造',         desc: '景观水系喷泉防水完成效果' },
    { cat: 'waterproof', img: 'images/case-glass-roof.jpg',     title: '阳光房玻璃顶防水',     desc: '玻璃顶防水维修（修复前 → 修复后）' },
    { cat: 'mep',        img: 'images/case-hvac.jpg',           title: '中央空调升级改造',     desc: '中央空调机组升级改造施工' },
    { cat: 'mep',        img: 'images/case-meter.jpg',          title: '智能电表更换',         desc: '楼宇智能电表批量更换施工' },
    { cat: 'mep',        img: 'images/case-floor.jpg',          title: '静电地板翻新',         desc: '机房静电地板翻新（翻新前 → 翻新后）' },
    { cat: 'mep',        img: 'images/case-door.jpg',           title: '防火门更换',           desc: '防火门维修更换（更换前 → 更换后）' },
    { cat: 'deco',       img: 'images/case-store.jpg',          title: '门店装饰装修',         desc: '造作（家居连锁）门店装饰装修' },
    { cat: 'deco',       img: 'images/case-showroom.jpg',       title: '展厅装修陈设',         desc: '品牌展厅装饰装修与软装陈设' },
    { cat: 'deco',       img: 'images/case-park.jpg',           title: '户外游乐园设计施工',   desc: '阿玛尼公寓室外儿童游乐园设计施工' },
    { cat: 'expo',       img: 'images/case-expo-booth.jpg',     title: '展厅搭建',             desc: '东方艺珍花丝镶嵌厂办公区及展厅装修升级改造' },
    { cat: 'expo',       img: 'images/case-expo-hall.jpg',      title: '展览馆装修',           desc: '大型展览馆装饰装修工程' },
    { cat: 'expo',       img: 'images/case-expo-case.jpg',      title: '展柜陈设',             desc: '花丝镶嵌展品展柜陈设施工' },
    { cat: 'lighting',   img: 'images/case-light-install.jpg',  title: '场馆灯具安装',         desc: '专业场馆灯具供应及安装施工现场' },
    { cat: 'lighting',   img: 'images/case-light-park.jpg',     title: '户外亮化工程',         desc: '户外亮化工程项目施工（施工后）' }
  ],

  /* ---------- 重点业绩（按时间排序） ---------- */
  milestones: [
    { year: '2018', date: '2018.03', img: 'images/proj-09.jpg', title: '润泽公馆', desc: '国贸物业酒店化管理的高端住宅项目。正式成为修缮工程及机电维保工程合格供应商。', tag: '修缮 + 机电维保' },
    { year: '2018', date: '2018.06', img: 'images/proj-12.jpg', title: '远洋国际二期', desc: 'CBD 东区甲级商务社区，总建筑面积 8.8 万㎡。正式成为修缮工程合格供应商。', tag: '修缮工程' },
    { year: '2018', date: '2018',    img: 'images/proj-01.jpg', title: '国家核电大厦', desc: '国家核电技术有限公司办公地址。成为排油烟设施升级改造工程特约供应商。', tag: '排油烟升级改造' },
    { year: '2018', date: '2018',    img: 'images/proj-06.jpg', title: '国际财富购物中心', desc: '北京财富中心二期，办公附带商业。成为该项目修缮工程供应商。', tag: '修缮工程' },
    { year: '2018', date: '2018',    img: 'images/proj-07.jpg', title: '中粮万科长阳半岛广场', desc: '中粮 × 万科打造，建筑面积约 13 万㎡。成为排油烟设施升级改造特约供应商。', tag: '排油烟升级改造' },
    { year: '2018', date: '2018',    img: 'images/proj-11.jpg', title: '国锐酒店', desc: '国锐·金嵿高端国际社区全功能型休闲天地，总建筑面积 2.7 万㎡。成为排油烟设施升级改造特约供应商。', tag: '排油烟升级改造' },
    { year: '2019', date: '2019',    img: 'images/proj-04.jpg', title: '人保财险北京分公司', desc: '中国人保旗下，迄今已有 66 年成长历程。成为装饰装修升级改造工程特约供应商。', tag: '装饰装修升级' },
    { year: '2019', date: '2019-2021', img: 'images/proj-08.jpg', title: '知行车谷', desc: '汽车垂直领域互联网创新生态平台，多次荣获中关村金种子企业等荣誉。连续三年为其装修升级改造供应商。', tag: '装修升级改造' },
    { year: '2020', date: '2020',    img: 'images/proj-05.jpg', title: '北京财富金融中心', desc: '扼守 CBD 商务核心，建筑高度 265 米。成为修缮工程合格供应商，服务至今。', tag: '修缮工程' },
    { year: '2021', date: '2021',    img: 'images/proj-02.jpg', title: '中国地震局', desc: '应急管理部管理，位于海淀区复兴路 63 号。成为物业修缮工程供应商。', tag: '物业修缮' },
    { year: '2022', date: '2022',    img: 'images/proj-03.jpg', title: '航天工程大学', desc: '培养航天指挥管理与工程技术人才的综合性大学。成为装饰装修工程合格供应商。', tag: '装饰装修' }
  ],

  /* ---------- 合作客户（有官方标识的品牌客户在前，其余按原序排列） ---------- */
  clients: [
    { name: '国家开发银行', work: '装修改造、空调设备升级改造', logo: 'images/clients/cdb.png' },
    { name: '人保财险北京分公司', work: '装修改造、防水维修', logo: 'images/clients/picc.png' },
    { name: '航天工程大学', work: '装饰装修', logo: 'images/clients/hangtian.png' },
    { name: '中国地震局', work: '防水维修、排风设备改造', logo: 'images/clients/cea.png' },
    { name: '国家核电大厦', work: '装修改造、油烟设备升级改造', logo: 'images/clients/snptc.png' },
    { name: '中科院北京生物基因研究所', work: '室内装修升级改造', logo: 'images/clients/cas.png' },
    { name: '北京市规自委通州分局', work: '装修改造', logo: 'images/clients/guizw.png' },
    { name: '北京财富购物中心', work: '室内外修缮工程', logo: 'images/clients/caifu.png' },
    { name: '远洋国际二期及未来汇购物中心', work: '室内装修、修缮、拆除', logo: 'images/clients/ocean.png' },
    { name: '阿玛尼公寓', work: '室外儿童游乐园设计施工', logo: 'images/clients/armani.svg' },
    { name: '知行车谷', work: '室内外装修升级改造', logo: 'images/clients/zxcg.png' },
    { name: '中国机床产业园区', work: '彩钢顶防水维修', logo: 'images/clients/jichuang.png' },
    { name: '造作（家居连锁）', work: '装饰装修', logo: 'images/clients/zaozuo.png' },
    { name: '悦动康乒乓球俱乐部（连锁）', work: '装饰装修', logo: 'images/clients/yuedongkang.png' },
    { name: '北京市东城区审计局', work: '防水维修' },
    { name: '北京财富金融中心', work: '装修改造、防水维修' },
    { name: '北京金泽大厦', work: '防水维修' },
    { name: '润泽公馆', work: '屋顶防水维修、机电设备维保' },
    { name: '润泽悦溪', work: '景观水系升级改造、机电设备维保' },
    { name: '润泽庄园', work: '机电设备维保大修、升级改造' },
    { name: '润泽墅郡', work: '屋顶及外露景观水系防水维修' },
    { name: '中国人民解放军63926部队', work: '室内装修升级改造' },
    { name: '东方艺珍花丝镶嵌厂', work: '办公区及展厅装修升级改造' }
  ]
};
