/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
const ContainerEdit = ({ clientId }) => {
	const blockProps = useBlockProps({
		className: 'alignfull', // Add 'alignfull' class to existing classes
	});
	const { selectBlock } = useDispatch('core/block-editor');

	// Attempt to find the first inner block of the 'tenup/container' type after insertion
	const innerBlockClientIds = useSelect(
		(select) => {
			const { getBlockOrder } = select('core/block-editor');
			return getBlockOrder(clientId);
		},
		[clientId],
	);

	useEffect(() => {
		if (innerBlockClientIds.length > 0) {
			// Select the first 'tenup/container' block. This assumes it's the first inner block.
			selectBlock(innerBlockClientIds[0]);
		}
	}, [innerBlockClientIds, selectBlock]);

	// Define the allowed blocks for your container block
	const ALLOWED_BLOCKS = ['tenup/inner-container'];

	// Template for the inner content of the container block
	const TEMPLATE = [['tenup/inner-container', {}]];
	return (
		<section {...blockProps}>
			<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
		</section>
	);
};

export default ContainerEdit;
