const fs = require('graceful-fs')
const path = require('path')
const { calculateRanges, getRangeHeaders, getLocalFilesize, rebuildFiles } = require(path.join(__dirname, '../build/downloader/util'))


test('get local file size test 1', () => {
	var filesize = getLocalFilesize('./test/downloads/d1.test.0.PARTIAL')
	expect(filesize).toBe(50)
})

test('get local file size test 2 (non-existent file)', () => {
	var filesize = getLocalFilesize('./test/downloads/nonexistent.file')
	expect(filesize).toBe(0)
})

test('calculate ranges test 1', () => {
	const filesize = 120000
	const threads = 3
	const ranges = [[0,40000],[40001,80000],[80001,120000]]
	expect(calculateRanges(filesize, threads)).toEqual(ranges)
})

test('calculate ranges test 2', () => {
	const filesize = 71885564
	const threads = 9
	const ranges = [[0,7987284],[7987285,15974568],[15974569,23961852],[23961853,31949136],[31949137,39936420],[39936421,47923704],[47923705,55910988],[55910989,63898272],[63898273,71885564]]
	expect(calculateRanges(filesize, threads)).toEqual(ranges)
})

test('get range headers test 1', () => {
	const savePath = './test/downloads/d1.test'
	var ranges = [[0,50],[51,100]]
	const rangeHeaders = [0,0]
	expect(getRangeHeaders(savePath, ranges)).toEqual(rangeHeaders)
})

test('get range headers test 2', () => {
	const savePath = './test/downloads/d2.test'
	var ranges = [[0,50],[51,100]]
	const rangeHeaders = ['bytes=21-50','bytes=53-100']
	expect(getRangeHeaders(savePath, ranges)).toEqual(rangeHeaders)
})