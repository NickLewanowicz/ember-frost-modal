import Ember from 'ember'
const { assign } = Ember
import FrostModalBinding from '../frost-modal-binding'
import { form } from '../../helpers/frost-modal-animation'
import PropTypesMixin, { PropTypes } from 'ember-prop-types'

export default FrostModalBinding.extend(PropTypesMixin, {

  // HACK: Needs to be replaced with a better proxy solution
  isConfirmDisabled: Ember.computed('confirm.disabled', function () {
    return this.get('confirm.disabled')
  }),

  // == State properties ======================================================

  propTypes: {
    // Options
    cancel: PropTypes.shape({
      isVisible: PropTypes.bool,
      text: PropTypes.string
    }),
    confirm: PropTypes.shape({
      disabled: PropTypes.bool,
      isVisible: PropTypes.bool,
      text: PropTypes.string
    }),
    form: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.EmberObject
    ]).isRequired,
    isVisible: PropTypes.bool.isRequired,
    targetOutlet: PropTypes.string,
    title: PropTypes.string.isRequired,

    // Actions
    onCancel: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func
  },

  getDefaultProps () {
    let defaultProps = this._super()

    assign(defaultProps, {
      animation: form,
      classModifier: 'form',
      modal: 'frost-modal-dialog',
      params: {
        cancel: this.cancel,
        confirm: this.confirm,
        content: this.form,
        links: this.links,
        title: this.title
      }
    })

    return defaultProps
  }

})
