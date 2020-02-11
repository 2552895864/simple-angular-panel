import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import _ from 'lodash';
import './css/module.css';
import drawl from './utils/drawLine.js';

interface Circle {
  name: string;
  lat: number;
  lng: number;
  value: number;
  size: number;
  type: string;
}

const WIDTH_HEIGHT_RATE = 310 / 235;
const BIG_LIMIT = 0.9;
const MAX_WIDTH_RATE = 0.25;
const MIDDLE_WIDTH_RATE = 0.15;
const MIN_WIDTH_RATE = 0.05;

export default class SimpleCtrl extends MetricsPanelCtrl {
  static templateUrl = 'partials/module.html';

  panelDefaults = {
    text: 'Hello World',
  };
  circleInfo: Circle[] = [];
  mapWidth = 0;
  mapHeight = 0;
  isInitial = true;

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

  drawLine() {
    const lines = Array.prototype.slice.call(document.querySelectorAll('.line'));
    const points = Array.prototype.slice.call(document.querySelectorAll('.point'));
    const circles = Array.prototype.slice.call(document.querySelectorAll('.circle'));
    const container = circles[0].offsetParent;
    if (lines && lines.length) {
      lines.forEach(ele => {
        container.removeChild(ele);
      });
    }
    if (points && points.length) {
      points.forEach(ele => {
        container.removeChild(ele);
      });
    }
    let flag = true;
    circles.forEach(ele => {
      const randomWidthRate = Math.random() * MAX_WIDTH_RATE;
      const widthRate = randomWidthRate >= MIN_WIDTH_RATE ? randomWidthRate : MIDDLE_WIDTH_RATE;
      drawl(
        ele,
        {
          x: ele.offsetLeft + this.mapWidth * (flag ? widthRate : -widthRate),
          y: ele.offsetTop,
        },
        container
      );
      flag = !flag;
    });
  }

  updateMapWidth() {
    if (this.height) {
      this.mapHeight = this.height;
      this.mapWidth = WIDTH_HEIGHT_RATE * this.height;
    }
  }

  onInitEditMode() {
    this.addEditorTab('Options', `public/plugins/${this.pluginId}/partials/options.html`, 2);
  }

  onPanelSizeChanged() {
    this.updateMapWidth();
  }

  onRefresh() {
    if (this.isInitial) {
      this.$timeout(this.drawLine.bind(this), 1000);
    } else {
      this.drawLine();
    }
    this.isInitial = false;
  }

  onRender() {
    if (!this.circleInfo || !this.circleInfo.length) {
      return;
    }
    console.log('render');
    // Tells the screen capture system that you finished
    this.renderingCompleted();
  }

  onDataError(err: any) {
    console.log('onDataError', err);
  }

  onPanelInitialized() {
    this.updateMapWidth();
    this.render();
  }

  onComponentDidMount() {
    this.render();
  }

  // 6.3+ get typed DataFrame directly
  handleDataFrame(data: any) {
    const circles: Circle[] = [];
    for (const frame of data) {
      for (let i = 0; i < frame.rows.length; i++) {
        const name = frame.rows[i][0];
        const lat = frame.rows[i][1];
        const lng = frame.rows[i][2];
        const live = frame.rows[i][3];
        const host = +name.split('_')[2];
        const value = live / host;
        const isBig = value > BIG_LIMIT;
        const size = isBig ? 38 : 26;
        const type = isBig ? 'big' : 'small';
        circles.push({
          name,
          lat,
          lng,
          value,
          size,
          type,
        });
      }
    }
    this.circleInfo = circles;
  }
}

export { SimpleCtrl as PanelCtrl };
