/**
 * @private
 */
Ext.define('Ext.event.publisher.Focus', {
    extend: 'Ext.event.publisher.Dom',

    type: 'focus',

    handledEvents: ['focusenter', 'focusleave'],

    handledDomEvents: ['focusin', 'focusout'],

    doDelegatedEvent: function(e, invokeAfter) {
        var me = this,
            relatedTarget;

        e = me.callParent([e, false]);

        if (e) {
            if (e.type === 'focusout') {
                // If focus is departing to the document, there will be no forthcoming focusin event
                // to trigger a focusleave, to fire a focusleave now.
                if (e.relatedTarget == null) {
                    me.processFocusIn(e, e.target, document.body, invokeAfter);
                }
            }
            else {
                relatedTarget = e.relatedTarget;

                // IE reports relatedTarget as either an inaccessible object which coercively
                // equates to null, or just a blank object in the case of focusing from nowhere.
                if (relatedTarget == null || !relatedTarget.tagName) {
                    relatedTarget = document.body;
                }
                
                me.processFocusIn(e, relatedTarget, e.target, invokeAfter);
            }
        }
    },

    processFocusIn: function(e, fromElement, toElement, invokeAfter) {
        var me = this,
            commonAncestor = Ext.Element.getCommonAncestor(toElement, fromElement, true),
            node, targets = [],
            event;

        // Gather targets for focusleave event from the fromElement to the parentNode (not inclusive)
        for (node = fromElement; node && node !== commonAncestor; node = node.parentNode) {
            targets.push(node);
        }

        // Publish the focusleave event for the bubble hierarchy
        if (targets.length) {
            event = me.createSyntheticEvent('focusleave', e, fromElement, toElement);
            me.publish('focusleave', targets, event);
            targets.length = 0;
            if (event.isStopped) {
                return;
            }
        }

        // Gather targets for focusenter event from the focus targetElement to the parentNode (not inclusive)
        for (node = toElement; node !== commonAncestor; node = node.parentNode) {
            targets.push(node);
        }

        // Publish the focusleave event for the bubble hierarchy
        event = me.createSyntheticEvent('focusenter', e, toElement, fromElement);
        me.publish('focusenter', targets, event);
        if (event.isStopped) {
            return;
        }

        if (invokeAfter) {
            me.afterEvent(e);
        }

        Ext.GlobalEvents.fireEvent('focus', {
            event: event,
            toElement: toElement,
            fromElement: fromElement
        });
    },
    
    createSyntheticEvent: function(eventName, browserEvent, target, relatedTarget) {
        var event = new Ext.event.Event(browserEvent);
    
        event.type = eventName;

        event.relatedTarget = relatedTarget;
        event.target = target;
    
        return event;
    }
},

function(Focus) {
    var focusTimeout;

    // At this point only Firefox does not support focusin/focusout, see this bug:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    if (!Ext.supports.FocusinFocusoutEvents) {
        // When focusin/focusout are not available we capture focus event instead,
        // and fire both focusenter *and* focusleave in the focus handler.
        this.override({
            handledDomEvents: ['focus', 'blur'],
            
            doDelegatedEvent: function(e, invokeAfter) {
                var me = this,
                    targetIsElement;
                
                e = me.callSuper([e, false]);
                
                if (e) {
                    // We need to know if event target was an element or (window || document)
                    targetIsElement = e.target !== window && e.target !== document;
                    
                    // There might be an upcoming focus event, but if none happens
                    // within a minimal timeout, then we treat this as a focus of the body
                    if (e.type === 'blur') {
                        if (!targetIsElement) {
                            // Apparently when focus goes outside of the document, Firefox
                            // will fire blur on the currently focused element, then on the document,
                            // then on the window. Interestingly enough, both follow-up blur events
                            // will have explicitOriginalTarget pointing at the previously focused
                            // element; when that happens we can be reasonably sure that focus
                            // indeed goes out the window.
                            if (e.explicitOriginalTarget === Focus.previousActiveElement) {
                                // But we want that to fire only once, so process window blur
                                // which happens last.
                                if (e.target === window) {
                                    clearTimeout(focusTimeout);
                                    focusTimeout = 0;
                                    me.processFocusIn(e, Focus.previousActiveElement, document.body, invokeAfter);
                                    Focus.previousActiveElement = null;
                                }
                            }
                        }
                        else {
                            // If event target is a valid element, blur could have been caused
                            // by removing previously focused element from the DOM, or some
                            // other happening that doesn't involve <strike>Elvis</strike>focus
                            // completely leaving the building.
                            focusTimeout = setTimeout(function() {
                                focusTimeout = 0;
                                me.processFocusIn(e, e.target, document.body, invokeAfter);
                                Focus.previousActiveElement = null;
                            }, 0);
                        }
                        
                        Focus.previousActiveElement = targetIsElement ? e.target : null;
                    }
                    else {
                        clearTimeout(focusTimeout);
                        focusTimeout = 0;
                        
                        me.processFocusIn(
                            e,
                            Focus.previousActiveElement || document.body,
                            targetIsElement ? e.target : document.body,
                            invokeAfter
                        );
                    }
                }
            }
        });
    }

    Focus.instance = new Focus();
});
