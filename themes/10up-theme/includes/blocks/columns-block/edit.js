import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { generateClassString } from '../../block-components/responsiveOptions';
import ResponsiveRangeControl from '../../block-components/responsiveRangeControl';
import ContainerOptions from '../../block-components/containerOptions';
import FlexboxControl from '../../block-components/flexboxOptions';
import SpacingOptions from '../../block-components/spacingOptions';
import manifest from '../../block-components/manifest.json';

const { sizeOptions, flexboxOptions, maxWidthSizes } = manifest;

const Edit = ({ attributes, setAttributes, clientId }) => {
	const {
		maxWidthSettings,
		isFullWidth,
		gridGapXSettings = {},
		gridGapYSettings = {},
		flexWrapSettings,
		flexDirectionSettings,
		justifyContentSettings,
		alignItemsSettings,
	} = attributes;

	const getMaxWidthClass = useMemo(() => {
		return generateClassString('max-width', maxWidthSizes, maxWidthSettings);
	}, [maxWidthSettings]);

	const getGapXClass = useMemo(() => {
		return generateClassString('gap-x', sizeOptions, gridGapXSettings);
	}, [gridGapXSettings]);

	const getGapYClass = useMemo(() => {
		return generateClassString('gap-y', sizeOptions, gridGapYSettings);
	}, [gridGapYSettings]);

	const getFlexWrapClass = useMemo(() => {
		return generateClassString('', flexboxOptions, flexWrapSettings);
	}, [flexWrapSettings]);

	const getFlexDirectionClass = useMemo(() => {
		const classes = [];
		Object.entries(flexDirectionSettings).forEach(([breakpoint, value]) => {
			if (value) {
				const className = breakpoint ? `${value}@${breakpoint}` : value;
				classes.push(className);
			}
		});
		return classes.join(' ');
	}, [flexDirectionSettings]);

	const getJustifyContentClass = useMemo(() => {
		return generateClassString('', flexboxOptions, justifyContentSettings);
	}, [justifyContentSettings]);

	const getAlignItemsClass = useMemo(() => {
		return generateClassString('', flexboxOptions, alignItemsSettings);
	}, [alignItemsSettings]);

	const getSpacingClass = useMemo(() => {
		const { paddingSettings = {}, marginSettings = {} } = attributes;

		const classes = [];

		Object.entries(paddingSettings).forEach(([breakpoint, values]) => {
			if (values) {
				Object.entries(values).forEach(([spacingOption, sizeOption]) => {
					if (sizeOption) {
						const className = breakpoint
							? `${spacingOption}-${sizeOption}@${breakpoint}`
							: `${spacingOption}-${sizeOption}`;
						classes.push(className);
					}
				});
			}
		});

		Object.entries(marginSettings).forEach(([breakpoint, values]) => {
			if (values) {
				Object.entries(values).forEach(([spacingOption, sizeOption]) => {
					if (sizeOption) {
						const className = breakpoint
							? `margin-${spacingOption}-${sizeOption}@${breakpoint}`
							: `margin-${spacingOption}-${sizeOption}`;
						classes.push(className);
					}
				});
			}
		});

		return classes.join(' ');
	}, [attributes]);

	let containerClassNamesFullWidth = '';
	if (isFullWidth) {
		containerClassNamesFullWidth = '';
	} else {
		containerClassNamesFullWidth = `container ${getMaxWidthClass}`;
	}

	let containerClassNames = '';
	if (isFullWidth) {
		containerClassNames = `container ${getMaxWidthClass}`;
	} else {
		containerClassNames = '';
	}

	const customProps = `${containerClassNames} grid ${getGapXClass} ${getGapYClass} ${getFlexWrapClass} ${getFlexDirectionClass} ${getJustifyContentClass} ${getAlignItemsClass} ${getSpacingClass}`;

	const blockProps = useBlockProps({
		className: isFullWidth
			? containerClassNamesFullWidth
			: `${containerClassNamesFullWidth} ${customProps}`,
	});

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ['tenup/column'],
			template: [['tenup/column', { placeholder: 'Column' }]],
			templateLock: false,
			renderAppender: () => (
				<Button
					className="custom-appender-button"
					onClick={() => {
						const newBlock = wp.blocks.createBlock('tenup/column', {
							placeholder: 'Column',
						});
						wp.data
							.dispatch('core/block-editor')
							.insertBlocks(newBlock, undefined, clientId);
					}}
				>
					Add Column
				</Button>
			),
		},
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Container Options', 'tenup-theme')}
					initialOpen
					className="sidebar"
				>
					<ContainerOptions attributes={attributes} setAttributes={setAttributes} />
				</PanelBody>
				<PanelBody
					title={__('Spacing Settings', 'tenup-theme')}
					initialOpen
					className="sidebar"
				>
					<SpacingOptions
						attributes={attributes}
						setAttributes={setAttributes}
						options={['padding', 'margin']}
					/>
				</PanelBody>
				<PanelBody
					title={__('Columns Settings', 'tenup-theme')}
					initialOpen
					className="sidebar"
				>
					<p className="sidebar__subtitle">Gap X</p>
					<p className="sidebar__desc">Set the horizontal gap between columns.</p>
					<ResponsiveRangeControl
						value={gridGapXSettings}
						onChange={(newSettings) => setAttributes({ gridGapXSettings: newSettings })}
						options={sizeOptions}
					/>
					<p className="sidebar__subtitle">Gap Y</p>
					<p className="sidebar__desc">Set the vertical gap between columns.</p>
					<ResponsiveRangeControl
						value={gridGapYSettings}
						onChange={(newSettings) => setAttributes({ gridGapYSettings: newSettings })}
						options={sizeOptions}
					/>
				</PanelBody>

				<PanelBody
					title={__('Flexbox Settings', 'tenup-theme')}
					initialOpen
					className="sidebar"
				>
					<FlexboxControl
						attributes={attributes}
						setAttributes={setAttributes}
						options={['justify', 'align', 'wrap', 'direction']}
					/>
				</PanelBody>
			</InspectorControls>

			{isFullWidth ? (
				<section {...blockProps}>
					<div className={customProps}>{innerBlocksProps.children}</div>
				</section>
			) : (
				<section {...blockProps}>{innerBlocksProps.children}</section>
			)}
		</>
	);
};

export default Edit;
