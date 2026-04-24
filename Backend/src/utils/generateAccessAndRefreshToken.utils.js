const generateAccessAndRefreshToken = async (user) => {

    try {
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (e) {
        throw new ApiError(`something went wrong while generate and access and refresh token ${e.message}`)

    }
}
export default generateAccessAndRefreshToken