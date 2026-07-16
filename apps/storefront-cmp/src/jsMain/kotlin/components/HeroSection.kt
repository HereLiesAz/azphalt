package components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import theme.skeuomorphicSurface

@Composable
fun HeroSection() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(64.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Azphalt Storefront",
            fontSize = 72.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFFF0F0F0)
        )
        Spacer(Modifier.height(24.dp))
        Text(
            text = "Physics-driven. Material 3 Expressive. Skeuomorphic.",
            fontSize = 24.sp,
            color = Color(0xFF888888)
        )
        
        Spacer(Modifier.height(64.dp))
        
        // Interactive Hero Button demonstrating inherent conveyance
        Box(
            modifier = Modifier
                .width(260.dp)
                .height(72.dp)
                .background(Color(0xFF7A5CFF))
                .skeuomorphicSurface(depth = 12f)
        ) {
            Text(
                "Explore the Registry",
                modifier = Modifier.align(Alignment.Center),
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}
