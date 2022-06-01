/**
 * @fileoverview  Javascript for Oppia XBlock.
 */

function OppiaXBlock(runtime, element) {
  var onLoadHandlerUrl = runtime.handlerUrl(
    element, 'on_exploration_loaded');
  var onStateTransitionUrl = runtime.handlerUrl(
    element, 'on_state_transition');
  var onCompleteHandlerUrl = runtime.handlerUrl(
    element, 'on_exploration_completed');

  $(function ($) {
    window.OPPIA_PLAYER.onExplorationLoadedPostHook = function(
        iframeNode, explorationVersion) {
      $.ajax({
        type: "POST",
        url: onLoadHandlerUrl,
        data: JSON.stringify({
          explorationVersion: explorationVersion
        })
      });
    };

    window.OPPIA_PLAYER.onStateTransitionPostHook = function(
        iframeNode, oldStateName, jsonAnswer, newStateName, explorationVersion) {
      $.ajax({
        type: "POST",
        url: onStateTransitionUrl,
        data: JSON.stringify({
          oldStateName: oldStateName,
          jsonAnswer: jsonAnswer,
          newStateName: newStateName,
          explorationVersion: explorationVersion
        })
      });
    };

    window.OPPIA_PLAYER.onExplorationCompletedPostHook = function(
        iframeNode, explorationVersion) {
      $.ajax({
        type: "POST",
        url: onCompleteHandlerUrl,
        data: JSON.stringify({
          explorationVersion: explorationVersion
        })
      });
    };
  });
}
