package com.denicks21.speechandtext.navigation

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.denicks21.speechandtext.MainActivity
import com.denicks21.speechandtext.screen.*
import com.denicks21.speechandtext.ui.composables.AppBottomBar
import com.denicks21.speechandtext.ui.composables.AppTopBar

@Composable
fun NavGraph(
    navController: NavHostController,
    speechInputState: MutableState<String>,
    listeningState:   MutableState<Boolean>,
    startListening:   () -> Unit,
    stopListening:    () -> Unit
) {
    Scaffold(
        topBar    = { AppTopBar() },
        bottomBar = { AppBottomBar(navController) }
    ) { innerPadding ->
        Box(modifier = Modifier.padding(innerPadding)) {
            NavHost(
                navController    = navController,
                startDestination = NavScreens.HomePage.route  // ahora arranca en Home
            ) {
                composable(NavScreens.IntroPage.route) {
                    IntroPage(navController)
                }
                composable(NavScreens.HomePage.route) {
                    HomePage(
                        speechInput       = speechInputState.value,
                        isListening       = listeningState.value,
                        onToggleListening = {
                            if (listeningState.value) stopListening() else startListening()
                        }
                    )
                }
                composable(NavScreens.SpeechToTextPage.route) {
                    SpeechToTextPage(navController)
                }
                composable(NavScreens.TextToSpeechPage.route) {
                    TextToSpeechPage(navController)
                }
                composable(NavScreens.FileListPage.route) {
                    val context = LocalContext.current
                    FileListPage(navController, context)
                }
                // —— Nuevas pantallas ——
                composable(NavScreens.HistoryPage.route) {
                    HistoryPage(navController)
                }
                composable(NavScreens.ContactsPage.route) {
                    ContactsPage(navController)
                }
                composable(NavScreens.MapPage.route) {
                    MapPage(navController)
                }
            }
        }
    }
}

