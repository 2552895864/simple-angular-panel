import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import _ from 'lodash';
import { DataFrame } from '@grafana/data';

export default class SimpleCtrl extends MetricsPanelCtrl {
  static templateUrl = 'partials/module.html';

  panelDefaults = {
    text: 'Hello World',
  };
  circleInfo = [];

  /** @ngInject */
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, this.panelDefaults);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));
    this.events.on('component-did-mount', this.render.bind(this));
    this.events.on('render', this.onRender.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', `public/plugins/${this.pluginId}/partials/options.html`, 2);
  }

  onRender() {
    if (!this.circleInfo || !this.circleInfo.length) {
      return;
    }
    // Tells the screen capture system that you finished
    this.renderingCompleted();
  }

  onDataError(err: any) {
    console.log('onDataError', err);
  }

  // 6.3+ get typed DataFrame directly
  handleDataFrame(data: DataFrame[]) {
    const values = [];
    console.log(data);
    for (const frame of data) {
      const keys = frame.fields.map(ele=>ele.name);
      for (const item of frame.rows){
        let obj = {
          name: '',
          lat: 0,
          lng: 0,
          value: 0,
        };
        for(let i = 0; i < item.length; i++){
          obj = {
            ...obj,
            [keys[i]]: item[i],
          };
        }
        values.push(obj);
      }
    }
    console.log(values);
    this.circleInfo = values;
  }
}

export { SimpleCtrl as PanelCtrl };
