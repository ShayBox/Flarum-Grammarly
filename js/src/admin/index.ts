import app from 'flarum/admin/app';

app.initializers.add('shaybox/grammarly', (app) => {
  app.extensionData
    .for('shaybox-grammarly')
    .registerSetting(
      {
        setting: 'shaybox-grammarly.client_id',
        label: app.translator.trans('shaybox-grammarly.admin.client_id.label'),
        help: app.translator.trans('shaybox-grammarly.admin.client_id.help'),
        type: 'text',
      },
    )
});
