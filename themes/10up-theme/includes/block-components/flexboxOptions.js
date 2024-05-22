import { ButtonGroup, Button } from '@wordpress/components';
import {
	PiArrowRight,
	PiArrowDown,
	PiArrowLeft,
	PiArrowUp,
	PiArrowLineRight,
	PiArrowUDownLeft,
	PiAlignLeft,
	PiAlignRight,
	PiAlignCenterHorizontal,
	PiColumns,
	PiAlignTop,
	PiAlignBottom,
	PiAlignCenterVerticalSimple,
	PiAlignCenterVertical,
} from 'react-icons/pi';
import BreakpointSettings from './responsiveOptions';

const FlexboxControl = ({ attributes, setAttributes, options = [] }) => {
	const { flexWrapSettings, flexDirectionSettings, justifyContentSettings, alignItemsSettings } =
		attributes;

	const handleUpdate = (breakpoint, value, settingsKey) => {
		setAttributes({
			[settingsKey]: {
				...attributes[settingsKey],
				[breakpoint]: value,
			},
		});
	};

	const handleButtonClick = (breakpoint, value, settingsKey) => {
		const newValue = value === attributes[settingsKey]?.[breakpoint] ? undefined : value;
		handleUpdate(breakpoint, newValue, settingsKey);
	};

	const renderFlexWrapControl = (breakpoint, settings) => (
		<div className="flexbox-control-group">
			<p className="components-base-control__label">
				{`Screen size: ${breakpoint !== '' ? `${breakpoint}` : 'All'}`}
			</p>
			<ButtonGroup>
				<Button
					isPressed={settings[breakpoint] === 'flex-wrap'}
					onClick={() => handleButtonClick(breakpoint, 'flex-wrap', 'flexWrapSettings')}
				>
					<PiArrowUDownLeft />
				</Button>
				<Button
					isPressed={settings[breakpoint] === 'flex-nowrap'}
					onClick={() => handleButtonClick(breakpoint, 'flex-nowrap', 'flexWrapSettings')}
				>
					<PiArrowLineRight />
				</Button>
			</ButtonGroup>
		</div>
	);

	const renderFlexDirectionControl = (breakpoint, settings) => (
		<div className="flexbox-control-group">
			<p className="components-base-control__label">
				{`Screen size: ${breakpoint !== '' ? `${breakpoint}` : 'All'}`}
			</p>
			<ButtonGroup>
				<div className="flex gap-xxs">
					<Button
						isPressed={settings[breakpoint] === 'flex-row'}
						onClick={() =>
							handleButtonClick(breakpoint, 'flex-row', 'flexDirectionSettings')
						}
					>
						<PiArrowRight />
					</Button>
					<Button
						isPressed={settings[breakpoint] === 'flex-row-reverse'}
						onClick={() =>
							handleButtonClick(
								breakpoint,
								'flex-row-reverse',
								'flexDirectionSettings',
							)
						}
					>
						<PiArrowLeft />
					</Button>
				</div>
				<div className="flex flex-column gap-xxs">
					<Button
						isPressed={settings[breakpoint] === 'flex-column'}
						onClick={() =>
							handleButtonClick(breakpoint, 'flex-column', 'flexDirectionSettings')
						}
					>
						<PiArrowDown />
					</Button>
					<Button
						isPressed={settings[breakpoint] === 'flex-column-reverse'}
						onClick={() =>
							handleButtonClick(
								breakpoint,
								'flex-column-reverse',
								'flexDirectionSettings',
							)
						}
					>
						<PiArrowUp />
					</Button>
				</div>
			</ButtonGroup>
		</div>
	);

	const renderJustifyContentControl = (breakpoint, settings) => (
		<div className="flexbox-control-group">
			<p className="components-base-control__label">
				{`Screen size: ${breakpoint !== '' ? `${breakpoint}` : 'All'}`}
			</p>
			<ButtonGroup>
				<Button
					isPressed={settings[breakpoint] === 'justify-start'}
					onClick={() =>
						handleButtonClick(breakpoint, 'justify-start', 'justifyContentSettings')
					}
				>
					<PiAlignLeft />
				</Button>
				<Button
					isPressed={settings[breakpoint] === 'justify-center'}
					onClick={() =>
						handleButtonClick(breakpoint, 'justify-center', 'justifyContentSettings')
					}
				>
					<PiAlignCenterHorizontal />
				</Button>
				<Button
					isPressed={settings[breakpoint] === 'justify-end'}
					onClick={() =>
						handleButtonClick(breakpoint, 'justify-end', 'justifyContentSettings')
					}
				>
					<PiAlignRight />
				</Button>
				<Button
					isPressed={settings[breakpoint] === 'justify-between'}
					onClick={() =>
						handleButtonClick(breakpoint, 'justify-between', 'justifyContentSettings')
					}
				>
					<PiColumns />
				</Button>
			</ButtonGroup>
		</div>
	);

	const renderAlignItemsControl = (breakpoint, settings) => (
		<div className="flexbox-control-group">
			<p className="components-base-control__label">
				{`Screen size: ${breakpoint !== '' ? `${breakpoint}` : 'All'}`}
			</p>
			<ButtonGroup>
				<Button
					isPressed={settings[breakpoint] === 'items-start'}
					onClick={() =>
						handleButtonClick(breakpoint, 'items-start', 'alignItemsSettings')
					}
				>
					<PiAlignTop />
				</Button>
				<Button
					isPressed={settings[breakpoint] === 'items-center'}
					onClick={() =>
						handleButtonClick(breakpoint, 'items-center', 'alignItemsSettings')
					}
				>
					<PiAlignCenterVerticalSimple />
				</Button>
				<Button
					isPressed={settings[breakpoint] === 'items-end'}
					onClick={() => handleButtonClick(breakpoint, 'items-end', 'alignItemsSettings')}
				>
					<PiAlignBottom />
				</Button>
				<Button
					isPressed={settings[breakpoint] === 'items-stretch'}
					onClick={() =>
						handleButtonClick(breakpoint, 'items-stretch', 'alignItemsSettings')
					}
				>
					<PiColumns />
				</Button>
				<Button
					isPressed={settings[breakpoint] === 'items-baseline'}
					onClick={() =>
						handleButtonClick(breakpoint, 'items-baseline', 'alignItemsSettings')
					}
				>
					<PiAlignCenterVertical />
				</Button>
			</ButtonGroup>
		</div>
	);

	return (
		<div className="flexbox-control">
			{options.includes('wrap') && (
				<>
					<p className="sidebar__subtitle">Flex Wrap</p>
					<BreakpointSettings
						settings={flexWrapSettings}
						renderControl={renderFlexWrapControl}
					/>
				</>
			)}
			{options.includes('direction') && (
				<>
					<p className="sidebar__subtitle">Flex Direction</p>
					<BreakpointSettings
						settings={flexDirectionSettings}
						renderControl={renderFlexDirectionControl}
					/>
				</>
			)}
			{options.includes('justify') && (
				<>
					<p className="sidebar__subtitle">Justify Content</p>
					<BreakpointSettings
						settings={justifyContentSettings}
						renderControl={renderJustifyContentControl}
					/>
				</>
			)}
			{options.includes('align') && (
				<>
					<p className="sidebar__subtitle">Align Items</p>
					<BreakpointSettings
						settings={alignItemsSettings}
						renderControl={renderAlignItemsControl}
					/>
				</>
			)}
		</div>
	);
};

export default FlexboxControl;
