import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import ForumApplication from 'flarum/forum/ForumApplication';

app.initializers.add('shaybox/grammarly', () => {
  extend(ForumApplication.prototype, 'mount', () => {
    let observer = new MutationObserver((mutations) =>
      mutations.forEach((mutation) =>
        mutation.addedNodes.forEach((addedNode) => {
          if (
            addedNode.matches &&
            !addedNode.closest("grammarly-editor-plugin") &&
            (
              addedNode.matches("input[type='text']") ||
              addedNode.matches("textarea") ||
              addedNode.matches("[contenteditable='true']"))
          ) {
            let editorPlugin = document.createElement("grammarly-editor-plugin");
            editorPlugin.setAttribute('client-id', app.forum.attribute("grammarly_client_id"));
            addedNode.parentNode.insertBefore(editorPlugin, addedNode);
            editorPlugin.appendChild(addedNode);
          }
        })));

    observer.observe(document, {
      childList: true,
      subtree: true
    });

    const script = document.createElement('script');
    script.setAttribute('src', `https://unpkg.com/@grammarly/editor-sdk?clientId=${app.forum.attribute("grammarly_client_id")}`)
    document.body.appendChild(script);
  });
});
