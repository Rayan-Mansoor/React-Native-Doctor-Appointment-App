package com.rayanmansoor.DoctorAppointmentApp

import android.os.Build
import android.os.Bundle
import android.view.KeyEvent
import android.util.Log

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import com.github.kevinejohn.keyevent.KeyEventModule

import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {

      override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
      Log.d("MainActivity", "onKeyUp: keyCode=$keyCode")
        if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
            KeyEventModule.getInstance().onKeyUpEvent(keyCode, event)
            return true // Consume the event to prevent default behavior
        }
        return super.onKeyUp(keyCode, event)
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent): Boolean {
      Log.d("MainActivity", "onKeyDown: keyCode=$keyCode")
        if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
            KeyEventModule.getInstance().onKeyDownEvent(keyCode, event)
            return true // Consume the event to prevent default behavior
        }
        return super.onKeyDown(keyCode, event)
    }



  override fun onCreate(savedInstanceState: Bundle?) {
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ){})
  }

  /**
    * Align the back button behavior with Android S
    * where moving root activities to background instead of finishing activities.
    * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
    */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // For non-root activities, use the default implementation to finish them.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Use the default back button implementation on Android S
      // because it's doing more than [Activity.moveTaskToBack] in fact.
      super.invokeDefaultOnBackPressed()
  }
}
