import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import _ from 'lodash';
// import './css/module.css';
// import drawl from './utils/drawLine.js';

// interface Circle {
//   name: string;
//   lat: number;
//   lng: number;
//   value: number;
//   size: number;
//   type: string;
//   live: number;
//   host: number;
// }

// const WIDTH_HEIGHT_RATE = 310 / 235;
// const BIG_LIMIT = 0.9;
// const MAX_WIDTH_RATE = 0.2;
// const MIDDLE_WIDTH_RATE = 0.15;
// const MIN_WIDTH_RATE = 0.1;

export default class SimpleCtrl extends MetricsPanelCtrl {
  static templateUrl = 'partials/module.html';

  panelDefaults = {
    text: 'Hello World',
  };
  // circleInfo: Circle[] = [];
  // mapWidth = 0;
  // mapHeight = 0;
  // mapFont = 16;
  // isInitial = true;
  // sizeTimer = null;

  /** @ngInject */
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, this.panelDefaults);

    (this as any).dataFormat = 'series';

    this.events.on('component-did-mount', this.onComponentDidMount.bind(this)); //dom生成前触发
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this)); //component-did-mount后触发
    this.events.on('panel-size-changed', this.onPanelSizeChanged.bind(this)); //大小改变触发
    this.events.on('refresh', this.onRefresh.bind(this)); //数据刷新触发，加载会触发一次
    this.events.on('panel-initialized', this.onPanelInitialized.bind(this));
    this.events.on('render', this.onRender.bind(this)); //加载、大小改变后触发
    this.events.on('data-error', this.onDataError.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', `public/plugins/${this.pluginId}/partials/options.html`, 2);
  }

  onPanelSizeChanged() {
  }

  onRefresh() {

  }

  onRender() {
    // Tells the screen capture system that you finished
    this.renderingCompleted();
  }

  onDataError(err: any) {
    console.log('onDataError', err);
  }

  onPanelInitialized() {
    this.render();
  }

  onComponentDidMount() {
    this.render();
  }

  // 6.3+ get typed DataFrame directly
  handleDataFrame(data: any) {
    // const circles: Circle[] = [];
    // for (const frame of data) {
    //   for (let i = 0; i < frame.rows.length; i++) {
    //     let name = frame.rows[i][0];
    //     const lat = frame.rows[i][1];
    //     const lng = frame.rows[i][2];
    //     const live = +frame.rows[i][3];
    //     const host = +name.split('_')[2];
    //     const value = live / host;
    //     const isBig = value > BIG_LIMIT;
    //     const size = isBig ? 38 : 26;
    //     const type = isBig ? 'big' : 'small';
    //     name = name.split('_')[0].split('|')[1];
    //     circles.push({
    //       name,
    //       lat,
    //       lng,
    //       value,
    //       size,
    //       type,
    //       live,
    //       host,
    //     });
    //   }
    // }
    // this.circleInfo = circles;
  }
}

export { SimpleCtrl as PanelCtrl };
