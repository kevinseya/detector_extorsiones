package com.denicks21.speechandtext.navigation

sealed class NavScreens(val route: String) {
    object IntroPage : NavScreens("IntroPage")
    object HomePage : NavScreens("HomePage")
    object SpeechToTextPage : NavScreens("SpeechToTextPage")
    object TextToSpeechPage : NavScreens("TextToSpeechPage")
    object FileListPage : NavScreens("FileListPage")
    object HistoryPage      : NavScreens("history")   // ← historial de grabaciones
    object ContactsPage     : NavScreens("contacts")  // ← lista de contactos
    object MapPage          : NavScreens("map")       // ← vista de mapa
}