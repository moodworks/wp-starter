import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';

const addSmallWidthButton = (BlockEdit) => {
	return (props) => {
		if (props.name !== 'core/group' && props.name !== 'core/cover') {
			return <BlockEdit {...props} />;
		}

		// Toggle 'alignsmall' class
		const toggleSmallWidthClass = () => {
			const { className } = props.attributes;
			const isSmallWidth = className && className.includes('alignsmall');
			const newClassName = isSmallWidth
				? className.replace(' alignsmall', '')
				: `${className || ''} alignsmall`.trim();

			props.setAttributes({ className: newClassName });
			console.log('Toggled Small Width:', !isSmallWidth); // For debugging
		};

		return (
			<>
				<BlockControls>
					<ToolbarButton
						icon="fullscreen-exit-alt" // Adjust the icon as needed
						label="Small width"
						onClick={toggleSmallWidthClass}
						isActive={
							props.attributes.className &&
							props.attributes.className.includes('alignsmall')
						}
					/>
				</BlockControls>
				<BlockEdit {...props} />
			</>
		);
	};
};

addFilter('editor.BlockEdit', 'my-plugin/add-small-width-button', addSmallWidthButton);
