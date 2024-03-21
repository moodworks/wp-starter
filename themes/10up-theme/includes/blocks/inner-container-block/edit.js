/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param {object}   props                  The block props.
 * @param {object}   props.attributes       Block attributes.
 * @param {string}   props.attributes.title Custom title to be displayed.
 * @param {string}   props.className        Class name for the block.
 * @param {Function} props.setAttributes    Sets the value for block attributes.
 * @returns {Function} Render the edit screen
 */
const InnerContainerEdit = (props) => {
	const { attributes, setAttributes } = props;
	const { maxWidth } = attributes; // Assuming you have a maxWidth attribute

	const blockProps = useBlockProps({
		className: `flex flex-wrap container ${maxWidth}`, // Add the class attribute with maxWidth
		// style: { maxWidth }, // Set the max-width in style attribute
	});

	const maxWidthOptions = [
		{ label: __('None'), value: '' },
		{ label: __('Small'), value: 'max-width-xxxxxs' },
		{ label: __('Medium'), value: 'max-width-xxs' },
		{ label: __('Normal'), value: 'max-width-sm' },
		{ label: __('Large'), value: 'max-width-md' },
		{ label: __('Max'), value: 'max-width-lg' },
		{ label: __('Extra Large'), value: 'max-width-xl' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Max Width')}>
					<SelectControl
						label={__('Max Width')}
						value={maxWidth}
						// options are a const defined in this file
						options={maxWidthOptions}
						onChange={(newMaxWidth) => setAttributes({ maxWidth: newMaxWidth })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks />
			</div>
		</>
	);
};

export default InnerContainerEdit;
