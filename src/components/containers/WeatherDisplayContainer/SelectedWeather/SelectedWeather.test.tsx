import React, { useState } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SelectedWeather } from './SelectedWeather';
import initialShallowRender from '../../../../utilities/test-utilities/initialShallowRender';
import { string } from 'prop-types';

describe('SelectedWeather Component', () => {
	let component: ShallowWrapper;
	const onClickAdd = jest.fn();
	const onClickRemove = jest.fn();

	beforeEach(
		() =>
			(component = shallow(
				<SelectedWeather
					currentWeatherHttpRequest={(
						val: string,
						cityName: string,
						countryName: string
					) => {}}
					favoritesList={['123', '456']}
					setNewFavoriteItem={onClickAdd}
					removeFromFavorites={onClickRemove}
					weatherData={{
						LocalObservationDateTime: '2019-10-18T13:45:00+03:00',
						EpochTime: 12332022240,
						WeatherText: 'warm',
						WeatherIcon: 1,
						IsDayTime: true,
						Link: 'www',
						Temperature: { Metric: { Value: 20, Unit: 'C' } },
						cityName: 'Tel-Aviv',
						countryName: 'Israel',
						key: '123',
					}}
					isLoading={false}
				/>
			))
	);

	it('should render without errors', () =>
		initialShallowRender(component, '.SelectedWeatherStyles'));

	it('should render the SelectedWeatherInfo if isLoading is false', () => {
		expect(component.children().find('SelectedWeatherInfo')).toBeTruthy();
		expect(component.children().find('SelectedWeatherInfo').length).toBe(1);
	});

	it('should render a ul tag with 2 li elements', () => {
		const ul = component.find('ul');

		expect(ul.length).toBe(1);
		expect(ul.children().length).toBe(2);
	});

	it('should display the weatherText in the 1st li, and the temperatures in the 2nd li', () => {
		const li = component.find('li');

		expect(li.at(0).text()).toBe('warm');
		expect(li.at(1).text()).toBe('20°C');
	});

	it('should have a button with a FavIcon component inside', () => {
		const button = component.find('button');
		const favIcon = button.children();

		expect(button.length).toBe(1);
		expect(favIcon.length).toBe(1);
	});

	it('upon a click on the favIcon button, should invoke the setNewFavoriteItem callback function if component is not a favorite', () => {
		const button = component.find('button');

		button.simulate('click');
		expect(onClickAdd).toHaveBeenCalled();
		expect(onClickAdd).toHaveBeenCalledTimes(1);
	});
});
