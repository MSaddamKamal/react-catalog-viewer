import React from 'react'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'
import { image1, image2, image3, image4 } from './assets/images'

jest.useFakeTimers()

const TEST_IDS = {
  viewerId: 'catalog-view',
  prevBtnId: 'prev-slide-btn',
  nextBtnId: 'next-slide-btn',
  thumbBtnPrefix: 'thumb-button-',
  toggleSlideShowBtnId: 'toggle-slide-show-button',
};

describe('Catalog Viewer', () => {

  let getByTestId
  let viewer
  let prevBtn
  let nextBtn
  let toggleSlideShowBtn
  let catalogs
  let thumbBtn2
  let thumbBtn4

  beforeEach(() => {
    const app = render(<App />)
    getByTestId = app.getByTestId
    viewer = getByTestId(TEST_IDS.viewerId)
    prevBtn = getByTestId(TEST_IDS.prevBtnId)
    nextBtn = getByTestId(TEST_IDS.nextBtnId)
    thumbBtn2 = getByTestId(TEST_IDS.thumbBtnPrefix + '1')
    thumbBtn4 = getByTestId(TEST_IDS.thumbBtnPrefix + '3')
    toggleSlideShowBtn = getByTestId(TEST_IDS.toggleSlideShowBtnId)

    catalogs = [
      {
        thumb: image1,
        image: image1
      },
      {
        thumb: image2,
        image: image2
      },
      {
        thumb: image3,
        image: image3
      },
      {
        thumb: image4,
        image: image4
      }
    ]
  })

  afterEach(() => {
    cleanup()
  })

  test('clicking on any catalog thumbnail should show the appropriate image', () => {
    fireEvent.click(thumbBtn2, { button: '0' })
    expect(viewer.src).toContain(catalogs[1].image)
    fireEvent.click(thumbBtn4, { button: '0' })
    expect(viewer.src).toContain(catalogs[3].image)
  })

  it('clicking on the previous button should show the previous image', () => {
    fireEvent.click(thumbBtn2, { button: '0' })
    expect(viewer.src).toContain(catalogs[1].image)
    fireEvent.click(prevBtn, { button: '0' })
    expect(viewer.src).toContain(catalogs[0].image)
  })

  it('clicking on the next button should show the next image', () => {
    expect(viewer.src).toContain(catalogs[0].image)
    fireEvent.click(nextBtn, { button: '0' })
    expect(viewer.src).toContain(catalogs[1].image)
  })

  test('clicking on the previous button when on the first item should show the last image',  () => {
    expect(viewer.src).toContain(catalogs[0].image)
    fireEvent.click(prevBtn, { button: '0' })
    expect(viewer.src).toContain(catalogs[3].image)
  })

  test('clicking on the next button when on the last item should show the first image',  () => {
    fireEvent.click(thumbBtn4, { button: '0' })
    expect(viewer.src).toContain(catalogs[3].image)
    fireEvent.click(nextBtn, { button: '0' })
    expect(viewer.src).toContain(catalogs[0].image)
  })

  test('should change the image every 3 seconds when slide show checked', () => {
    expect(viewer.src).toContain(catalogs[0].image)
    fireEvent.click(toggleSlideShowBtn, { button: '0' })
    expect(toggleSlideShowBtn.checked).toEqual(true)
    act (() => jest.advanceTimersByTime(6010))
    expect(viewer.src).toContain(catalogs[2].image)
  })

  test('should have user interaction like before, when slide show checked', () => {
    expect(viewer.src).toContain(catalogs[0].image)
    fireEvent.click(toggleSlideShowBtn, { button: '0' })
    fireEvent.click(thumbBtn4, { button: '0' })
    fireEvent.click(nextBtn, { button: '0' })
    fireEvent.click(nextBtn, { button: '0' })
    fireEvent.click(prevBtn, { button: '0' })
    act (() => jest.advanceTimersByTime(3010))
    expect(viewer.src).toContain(catalogs[1].image)
  })

  test('should stop changing the image every 3 seconds when slide show unchecked', () => {
    fireEvent.click(thumbBtn2, { button: '0' })
    expect(viewer.src).toContain(catalogs[1].image)
    fireEvent.click(toggleSlideShowBtn, { button: '0' })
    expect(toggleSlideShowBtn.checked).toEqual(true)
    act (() => jest.advanceTimersByTime(3010))
    expect(viewer.src).toContain(catalogs[2].image)
    fireEvent.click(toggleSlideShowBtn, { button: '0' })
    expect(toggleSlideShowBtn.checked).toEqual(false)
    act (() => jest.advanceTimersByTime(3010))
    expect(viewer.src).toContain(catalogs[2].image)
  })
})